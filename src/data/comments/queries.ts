
import { supabase } from "@/integrations/supabase/client";
import type { Comment, CommentResponse, CommentFilters } from "./types";

export const fetchComments = async (filters?: CommentFilters): Promise<Comment[]> => {
  let query = supabase
    .from('property_comments')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters) {
    if (filters.sentiment) {
      query = query.eq('sentiment', filters.sentiment);
    }
    if (filters.source) {
      query = query.eq('source', filters.source);
    }
    if (filters.location) {
      query = query.eq('location', filters.location);
    }
    if (filters.searchTerm) {
      query = query.or(`client_name.ilike.%${filters.searchTerm}%,comment_text.ilike.%${filters.searchTerm}%`);
    }
    if (filters.startDate && filters.endDate) {
      query = query.gte('created_at', filters.startDate.toISOString())
                  .lte('created_at', filters.endDate.toISOString());
    }
  }

  const { data, error } = await query;

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
    .select('sentiment')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comment stats:', error);
    throw error;
  }

  const stats = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  data.forEach(comment => {
    stats[comment.sentiment]++;
  });

  return stats;
};
