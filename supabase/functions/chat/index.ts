import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, activeFilters } = await req.json();
    console.log('Mensaje recibido:', message);
    console.log('Filtros activos:', activeFilters);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY no está configurada');
    }

    let systemPrompt = `Eres un asistente inmobiliario experto y servicial. Tu objetivo es ayudar a los usuarios a encontrar la vivienda perfecta para sus necesidades.
    Mantén respuestas cortas y relevantes, enfocándote en entender las necesidades del usuario y sugerir características importantes para su búsqueda.
    
    Filtros activos actuales: ${activeFilters?.join(', ') || 'ninguno'}
    
    Palabras clave que puedes identificar:
    - Tamaño: grande, espacioso
    - Exterior: jardín, terraza, piscina
    - Tipo: ático, chalet, piso
    - Características: lujo, reformado, céntrico, moderno, vistas
    - Necesidades específicas: familia, mascotas, trabajo desde casa
    
    Responde de manera natural y conversacional, pero asegúrate de mencionar características relevantes que ayuden a filtrar las propiedades.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error de OpenAI:', error);
      throw new Error(`Error en la respuesta de OpenAI: ${error}`);
    }

    const data = await response.json();
    console.log('Respuesta recibida de OpenAI:', data);

    const reply = data.choices[0].message.content;
    console.log('Respuesta procesada:', reply);

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});