import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "¡Hola! Soy tu asistente inmobiliario. ¿En qué puedo ayudarte?", isUser: false}
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, {text: userMessage, isUser: true}]);
    setIsLoading(true);

    try {
      console.log('Enviando mensaje:', userMessage);
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: userMessage }
      });

      console.log('Respuesta recibida:', data);

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      if (!data?.reply) {
        console.error('Respuesta vacía:', data);
        throw new Error('No se recibió una respuesta válida del asistente');
      }

      setMessages(prev => [...prev, {
        text: data.reply,
        isUser: false
      }]);
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      toast({
        title: "Error",
        description: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
      
      setMessages(prev => [...prev, {
        text: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col shadow-xl bg-white">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h3 className="font-heading">Asistente Inmobiliario</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser ? 'bg-primary text-white' : 'bg-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border rounded-md"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Enviar'
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default Chatbot;