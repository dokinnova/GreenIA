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

    // Create a thread if it doesn't exist
    console.log('Creating thread...');
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      }
    });

    if (!threadResponse.ok) {
      const errorData = await threadResponse.text();
      console.error('Error creating thread:', errorData);
      throw new Error(`Error creating thread: ${errorData}`);
    }

    const thread = await threadResponse.json();
    console.log('Thread created:', thread);

    // Add the message to the thread
    console.log('Adding message to thread...');
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        role: 'user',
        content: `${message} (Filtros activos actuales: ${activeFilters?.join(', ') || 'ninguno'})`
      })
    });

    if (!messageResponse.ok) {
      const errorData = await messageResponse.text();
      console.error('Error adding message:', errorData);
      throw new Error(`Error adding message: ${errorData}`);
    }

    console.log('Message added successfully');

    // Run the assistant
    console.log('Starting assistant run...');
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v1'
      },
      body: JSON.stringify({
        assistant_id: 'asst_AVYjAQEHXSViNb5wmMoAC6PS',
        instructions: "Eres un asistente inmobiliario experto. Ayuda a los usuarios a encontrar propiedades basándote en sus necesidades y preferencias. Ten en cuenta los filtros activos que se te proporcionan."
      })
    });

    if (!runResponse.ok) {
      const errorData = await runResponse.text();
      console.error('Error starting run:', errorData);
      throw new Error(`Error starting run: ${errorData}`);
    }

    const run = await runResponse.json();
    console.log('Run started:', run);

    // Poll for the run completion
    let runStatus = await checkRunStatus(run.id, thread.id, openAIApiKey);
    console.log('Initial run status:', runStatus);
    
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await checkRunStatus(run.id, thread.id, openAIApiKey);
      console.log('Updated run status:', runStatus);
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      console.log('Getting assistant response...');
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'OpenAI-Beta': 'assistants=v1'
        }
      });

      if (!messagesResponse.ok) {
        const errorData = await messagesResponse.text();
        console.error('Error retrieving messages:', errorData);
        throw new Error(`Error retrieving messages: ${errorData}`);
      }

      const messages = await messagesResponse.json();
      const lastMessage = messages.data[0];
      console.log('Assistant response:', lastMessage);

      return new Response(
        JSON.stringify({ reply: lastMessage.content[0].text.value }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error(`Run failed with status: ${runStatus.status}`);
    }

  } catch (error) {
    console.error('Error detallado en chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function checkRunStatus(runId: string, threadId: string, apiKey: string) {
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v1'
    }
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Error checking run status:', errorData);
    throw new Error(`Error checking run status: ${errorData}`);
  }

  return await response.json();
}