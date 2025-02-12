
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComments, updateCommentStatus } from '@/data/comments/queries';
import type { Comment, CommentFilters } from '@/data/comments/types';
import { toast } from 'sonner';

interface CommentsListProps {
  filters?: CommentFilters;
}

const getSentimentIcon = (sentiment: Comment['sentiment']) => {
  switch (sentiment) {
    case 'positive':
      return <ThumbsUp className="h-4 w-4 text-green-500" />;
    case 'negative':
      return <ThumbsDown className="h-4 w-4 text-red-500" />;
    default:
      return <Minus className="h-4 w-4 text-gray-500" />;
  }
};

const getSourceBadge = (source: Comment['source']) => {
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

export const CommentsList = ({ filters }: CommentsListProps) => {
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', filters],
    queryFn: () => fetchComments(filters),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ commentId, updates }: { commentId: number, updates: { is_reviewed?: boolean, is_priority?: boolean } }) =>
      updateCommentStatus(commentId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Estado del comentario actualizado');
    },
    onError: (error) => {
      toast.error('Error al actualizar el estado del comentario');
      console.error('Error:', error);
    },
  });

  const handleTogglePriority = (commentId: number, currentPriority: boolean) => {
    updateStatusMutation.mutate({
      commentId,
      updates: { is_priority: !currentPriority }
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

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
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {getSentimentIcon(comment.sentiment)}
                  <div>
                    <div className="font-medium">{comment.client_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSourceBadge(comment.source)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => handleTogglePriority(comment.id, comment.is_priority || false)}
                  >
                    <Star className={`h-4 w-4 ${comment.is_priority ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm">{comment.comment_text}</p>
              
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Reply className="h-4 w-4 mr-1" />
                  Responder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => updateStatusMutation.mutate({
                    commentId: comment.id,
                    updates: { is_reviewed: true }
                  })}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Marcar como revisado
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
