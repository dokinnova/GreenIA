
import React from 'react';
import { Header } from '@/components/sentiment-analysis/Header';

const SentimentAnalysis = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      <div className="text-center py-12">
        <p className="text-gray-600">
          Próximamente: Análisis de sentimiento y opiniones de clientes
        </p>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
