
import React, { useState } from 'react';
import { Header } from '@/components/sentiment-analysis/Header';
import { Filters } from '@/components/sentiment-analysis/Filters';
import { DataVisualization } from '@/components/sentiment-analysis/DataVisualization';
import { CommentsList } from '@/components/sentiment-analysis/CommentsList';
import { AlertsWidget } from '@/components/sentiment-analysis/AlertsWidget';
import type { CommentFilters } from '@/data/comments/types';

const SentimentAnalysis = () => {
  const [filters, setFilters] = useState<CommentFilters>({});

  const handleFiltersChange = (newFilters: CommentFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <Filters onFiltersChange={handleFiltersChange} />
        </div>
        <div className="xl:col-span-2">
          <DataVisualization />
          <CommentsList filters={filters} />
        </div>
        <div className="xl:col-span-1">
          <AlertsWidget />
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
