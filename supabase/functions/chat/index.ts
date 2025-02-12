
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente inmobiliario experto que ayuda a los usuarios a encontrar propiedades en nuestra web. 
            Tu trabajo es entender las necesidades del usuario y ayudarle a refinar su búsqueda usando los filtros disponibles.
            
            INFORMACIÓN DE PROPIEDADES DISPONIBLES:
            - Tenemos una casa rural con encanto en la Sierra de Gredos, Ávila
            - El precio es de 295.000€
            - Tiene 3 dormitorios y 2 baños
            - 180 metros cuadrados
            - Tiene jardín
            - Keywords: rural, montaña, tradicional
            
            IMPORTANTE:
            - Cuando mencionen Ávila o Sierra de Gredos, SIEMPRE menciona la propiedad anterior
            - Si los filtros actuales son muy restrictivos, sugiere al usuario que los relaje
            - Usa el formato "295k" para precios
            - Sé amable y profesional
            - SIEMPRE menciona las propiedades que tenemos disponibles que coincidan con lo que busca el usuario
            
            Filtros actualmente aplicados: ${JSON.stringify(activeFilters, null, 2)}`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Error en la API de OpenAI: ${await response.text()}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error en la función de chat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar tu mensaje',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
