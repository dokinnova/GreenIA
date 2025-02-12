
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div 
      className="relative py-8 md:py-16 text-white bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1800")',
        minHeight: '300px',
        maxHeight: '400px'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="container mx-auto text-center relative z-10 px-4">
        <img 
          src="/logo.svg" 
          alt="GrennIA Logo" 
          className="h-6 md:h-10 mx-auto mb-4 md:mb-6"
        />
        <h1 className="font-heading text-2xl md:text-4xl font-bold mb-3 md:mb-4">
          Encuentra tu hogar ideal
        </h1>
        <p className="text-base md:text-lg mb-4 md:mb-6">
          La plataforma de IA que te ayuda a ofrecer la mejor vivienda
        </p>
        
        <div className="max-w-2xl mx-auto flex gap-2 px-4">
          <Input 
            placeholder="Buscar por ubicación..." 
            className="bg-white text-gray-900"
          />
          <Button className="bg-white text-primary hover:bg-gray-100">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
