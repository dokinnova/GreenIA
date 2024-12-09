import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ID del asistente de OpenAI
const ASSISTANT_ID = 'asst_AVYjAQEHXSViNb5wmMoAC6PS';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Mensaje recibido:', message)

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY no está configurada')
    }

    // Crear un thread
    console.log('Creando thread...')
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      }
    });

    if (!threadResponse.ok) {
      const error = await threadResponse.text()
      console.error('Error al crear thread:', error)
      throw new Error(`Error al crear thread: ${error}`)
    }

    const thread = await threadResponse.json();
    console.log('Thread creado:', thread.id)

    // Añadir el mensaje al thread
    console.log('Añadiendo mensaje al thread...')
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        role: 'user',
        content: message
      })
    });

    if (!messageResponse.ok) {
      const error = await messageResponse.text()
      console.error('Error al añadir mensaje:', error)
      throw new Error(`Error al añadir mensaje: ${error}`)
    }

    // Ejecutar el asistente
    console.log('Ejecutando el asistente...')
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID
      })
    });

    if (!runResponse.ok) {
      const error = await runResponse.text()
      console.error('Error al ejecutar el asistente:', error)
      throw new Error(`Error al ejecutar el asistente: ${error}`)
    }

    const run = await runResponse.json();
    console.log('Run creado:', run.id)

    // Esperar a que el asistente termine de procesar
    let runStatus;
    let attempts = 0;
    const maxAttempts = 60; // Aumentamos el tiempo máximo de espera a 60 segundos
    
    do {
      console.log('Verificando estado del run...')
      const statusResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`, {
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });

      if (!statusResponse.ok) {
        const error = await statusResponse.text()
        console.error('Error al verificar estado:', error)
        throw new Error(`Error al verificar estado: ${error}`)
      }

      runStatus = await statusResponse.json();
      console.log('Estado actual:', runStatus.status)

      if (runStatus.status === 'failed') {
        console.error('La ejecución falló:', runStatus.last_error)
        throw new Error(`La ejecución del asistente falló: ${runStatus.last_error?.message || 'Error desconocido'}`)
      }

      if (runStatus.status !== 'completed') {
        attempts++;
        if (attempts >= maxAttempts) {
          throw new Error('Tiempo de espera agotado')
        }
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } while (runStatus.status !== 'completed');

    // Obtener los mensajes
    console.log('Obteniendo mensajes...')
    const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'OpenAI-Beta': 'assistants=v1'
      }
    });

    if (!messagesResponse.ok) {
      const error = await messagesResponse.text()
      console.error('Error al obtener mensajes:', error)
      throw new Error(`Error al obtener mensajes: ${error}`)
    }

    const messages = await messagesResponse.json();
    const lastMessage = messages.data[0];
    console.log('Respuesta del asistente:', lastMessage.content[0].text.value)

    return new Response(
      JSON.stringify({ reply: lastMessage.content[0].text.value }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Error en chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})