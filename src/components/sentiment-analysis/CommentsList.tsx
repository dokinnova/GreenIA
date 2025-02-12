
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  ThumbsUp, 
  Minus, 
  ThumbsDown,
  Star,
  Reply,
  Flag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockComments = [
  {
    id: 1,
    clientName: 'María García',
    comment: 'Excelente atención y el piso estaba en perfectas condiciones.',
    sentiment: 'positive',
    source: 'google',
    date: '2024-03-15',
    isReviewed: true,
    isPriority: false,
  },
  {
    id: 2,
    clientName: 'Juan Pérez',
    comment: 'La ubicación es buena pero el precio es algo elevado.',
    sentiment: 'neutral',
    source: 'internal_form',
    date: '2024-03-14',
    isReviewed: false,
    isPriority: true,
  },
];

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <ThumbsUp className="h-4 w-4 text-green-500" />;
    case 'negative':
      return <ThumbsDown className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-500" />;
  }
};

const getSourceBadge = (source: string) => {
  switch (source) {
    case 'google':
      return <Badge variant="secondary">Google</Badge>;
    case 'social_media':
      return <Badge variant="secondary">Redes Sociales</Badge>;
    case 'internal_form':
      return <Badge variant="secondary">Formulario</Badge>;
    default:
      return null;
  }
};

export const CommentsList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comentarios Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockComments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {getSentimentIcon(comment.sentiment)}
                  <div>
                    <div className="font-medium">{comment.clientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {comment.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSourceBadge(comment.source)}
                  {comment.isPriority && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              </div>
              
              <p className="text-sm">{comment.comment}</p>
              
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Reply className="h-4 w-4 mr-1" />
                  Responder
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Flag className="h-4 w-4 mr-1" />
                  Marcar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
