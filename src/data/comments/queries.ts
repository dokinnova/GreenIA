
import { supabase } from "@/integrations/supabase/client";
import type { Comment, CommentResponse, CommentFilters } from "./types";

export const fetchComments = async (filters?: CommentFilters): Promise<Comment[]> => {
  // Start with a base query
  const baseQuery = supabase
    .from('property_comments')
    .select('*');

  // Apply filters sequentially
  let finalQuery = baseQuery;

  if (filters) {
    if (filters.sentiment) {
      finalQuery = finalQuery.eq('sentiment', filters.sentiment);
    }
    if (filters.source) {
      finalQuery = finalQuery.eq('source', filters.source);
    }
    if (filters.location) {
      finalQuery = finalQuery.eq('location', filters.location);
    }
    if (filters.searchTerm) {
      finalQuery = finalQuery.or(`client_name.ilike.%${filters.searchTerm}%,comment_text.ilike.%${filters.searchTerm}%`);
    }
    if (filters.startDate && filters.endDate) {
      finalQuery = finalQuery.gte('created_at', filters.startDate.toISOString())
                           .lte('created_at', filters.endDate.toISOString());
    }
  }

  // Apply final ordering
  const { data, error } = await finalQuery.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }

  return data || [];
};

export const addCommentResponse = async (commentId: number, responseText: string): Promise<CommentResponse> => {
  const { data, error } = await supabase
    .from('comment_responses')
    .insert({ comment_id: commentId, response_text: responseText })
    .select()
    .single();

  if (error) {
    console.error('Error adding comment response:', error);
    throw error;
  }

  return data;
};

export const updateCommentStatus = async (commentId: number, updates: {
  is_reviewed?: boolean;
  is_priority?: boolean;
}): Promise<Comment> => {
  const { data, error } = await supabase
    .from('property_comments')
    .update(updates)
    .eq('id', commentId)
    .select()
    .single();

  if (error) {
    console.error('Error updating comment status:', error);
    throw error;
  }

  return data;
};

export const getCommentStats = async () => {
  const { data, error } = await supabase
    .from('property_comments')
    .select('sentiment');

  if (error) {
    console.error('Error fetching comment stats:', error);
    throw error;
  }

  const stats = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  data.forEach((comment) => {
    if (comment.sentiment) {
      stats[comment.sentiment]++;
    }
  });

  return stats;
};

export const getCommentTrends = async () => {
  const { data, error } = await supabase
    .from('property_comments')
    .select('sentiment, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comment trends:', error);
    throw error;
  }

  type TrendData = {
    [key: string]: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };

  // Agrupar por fecha y contar sentimientos
  const groupedByDate = data.reduce<TrendData>((acc, comment) => {
    const date = new Date(comment.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { positive: 0, neutral: 0, negative: 0 };
    }
    if (comment.sentiment) {
      acc[date][comment.sentiment]++;
    }
    return acc;
  }, {});

  // Convertir a array para el gráfico
  return Object.entries(groupedByDate).map(([date, counts]) => ({
    date,
    positive: counts.positive,
    neutral: counts.neutral,
    negative: counts.negative,
  }));
};
