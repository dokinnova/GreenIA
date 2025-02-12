
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-start gap-4 mb-8">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/dashboard')}
        className="mt-2"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 font-heading">
          Análisis Predictivo de Precios del Mercado
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Visualiza tendencias futuras y toma decisiones informadas
        </p>
      </div>
    </div>
  );
};
