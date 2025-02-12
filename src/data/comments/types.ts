
import { Database } from "@/integrations/supabase/types";

export type Comment = Database["public"]["Tables"]["property_comments"]["Row"];
export type CommentResponse = Database["public"]["Tables"]["comment_responses"]["Row"];

export interface CommentFilters {
  sentiment?: Database["public"]["Enums"]["sentiment_type"];
  source?: Database["public"]["Enums"]["comment_source"];
  location?: string;
  searchTerm?: string;
  startDate?: Date;
  endDate?: Date;
}
