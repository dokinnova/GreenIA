import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "¡Hola! Soy tu asistente inmobiliario. ¿En qué puedo ayudarte?", isUser: false}
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {text: input, isUser: true}]);
    setInput("");
    
    // Aquí se conectaría con el agente GPT
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Por el momento soy un chatbot de demostración. Pronto estaré conectado con un agente GPT para ayudarte mejor.",
        isUser: false
      }]);
    }, 1000);
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
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col shadow-xl">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h3 className="font-heading">Asistente Inmobiliario</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser ? 'bg-primary text-white' : 'bg-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full p-2 border rounded-md"
            />
          </form>
        </Card>
      )}
    </>
  );
};

export default Chatbot;