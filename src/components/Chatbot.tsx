
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { extractPropertyFilters } from '../utils/propertyFilters';

interface ChatbotProps {
  onFilter: (filters: PropertyFilters) => void;
  onResetFilter: () => void;
}

export interface PropertyFilters {
  keywords: string[];
  bathrooms?: number;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
}

const Chatbot = ({ onFilter, onResetFilter }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "¡Hola! Soy tu asistente inmobiliario. ¿Qué tipo de vivienda estás buscando?", isUser: false}
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<PropertyFilters>({ keywords: [] });
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

    // Extract filters from the message
    const newFilters = extractPropertyFilters(userMessage, activeFilters);
    setActiveFilters(newFilters);
    onFilter(newFilters);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          message: userMessage,
          activeFilters: newFilters
        }
      });

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

  const handleReset = () => {
    setActiveFilters({ keywords: [] });
    onResetFilter();
    setMessages([{
      text: "¡Hola! Soy tu asistente inmobiliario. ¿Qué tipo de vivienda estás buscando?",
      isUser: false
    }]);
  };

  // Ocultar el hint cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      setShowHint(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex items-end">
        {showHint && (
          <div className="animate-bounce mb-2 mr-4 bg-white p-3 rounded-lg shadow-lg">
            <p className="text-sm font-medium">
              ¡Hola! 👋 Puedo ayudarte a encontrar la vivienda ideal para tu cliente
            </p>
          </div>
        )}
        <Button
          size="lg"
          className="rounded-full p-6 bg-primary hover:bg-primary-hover shadow-lg transition-all duration-300 hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-4 w-96 h-[600px] flex flex-col shadow-xl bg-white">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h3 className="font-heading text-lg">Asistente Inmobiliario</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleReset}
                title="Reiniciar conversación"
              >
                <Loader2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
