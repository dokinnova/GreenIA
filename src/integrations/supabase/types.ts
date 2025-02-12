export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comment_responses: {
        Row: {
          comment_id: number | null
          created_at: string
          id: number
          response_text: string
          updated_at: string
        }
        Insert: {
          comment_id?: number | null
          created_at?: string
          id?: number
          response_text: string
          updated_at?: string
        }
        Update: {
          comment_id?: number | null
          created_at?: string
          id?: number
          response_text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_responses_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "property_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      market_metrics: {
        Row: {
          absorption_rate: number
          average_price: number
          created_at: string
          date: string
          days_on_market: number
          demand_index: number
          id: number
          location: string
          property_type: string
          search_volume: number
          transactions_volume: number
          updated_at: string
        }
        Insert: {
          absorption_rate: number
          average_price: number
          created_at?: string
          date: string
          days_on_market: number
          demand_index: number
          id?: number
          location: string
          property_type: string
          search_volume: number
          transactions_volume: number
          updated_at?: string
        }
        Update: {
          absorption_rate?: number
          average_price?: number
          created_at?: string
          date?: string
          days_on_market?: number
          demand_index?: number
          id?: number
          location?: string
          property_type?: string
          search_volume?: number
          transactions_volume?: number
          updated_at?: string
        }
        Relationships: []
      }
      market_predictions: {
        Row: {
          confidence_level: number
          created_at: string
          factors: Json | null
          id: number
          location: string
          predicted_price: number
          prediction_date: string
          property_type: string
          scenario_type: string
          updated_at: string
        }
        Insert: {
          confidence_level: number
          created_at?: string
          factors?: Json | null
          id?: number
          location: string
          predicted_price: number
          prediction_date: string
          property_type: string
          scenario_type: string
          updated_at?: string
        }
        Update: {
          confidence_level?: number
          created_at?: string
          factors?: Json | null
          id?: number
          location?: string
          predicted_price?: number
          prediction_date?: string
          property_type?: string
          scenario_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          bathrooms: number
          bedrooms: number
          created_at: string
          has_garden: boolean | null
          id: number
          image_url: string | null
          image_urls: string[] | null
          keywords: string[] | null
          location: string
          price: number
          size: number
          title: string
          updated_at: string
        }
        Insert: {
          bathrooms: number
          bedrooms: number
          created_at?: string
          has_garden?: boolean | null
          id?: never
          image_url?: string | null
          image_urls?: string[] | null
          keywords?: string[] | null
          location: string
          price: number
          size: number
          title: string
          updated_at?: string
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          has_garden?: boolean | null
          id?: never
          image_url?: string | null
          image_urls?: string[] | null
          keywords?: string[] | null
          location?: string
          price?: number
          size?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_comments: {
        Row: {
          client_name: string
          comment_text: string
          created_at: string
          id: number
          is_priority: boolean | null
          is_reviewed: boolean | null
          keywords: string[] | null
          location: string | null
          property_id: number | null
          sentiment: Database["public"]["Enums"]["sentiment_type"]
          source: Database["public"]["Enums"]["comment_source"]
          updated_at: string
        }
        Insert: {
          client_name: string
          comment_text: string
          created_at?: string
          id?: number
          is_priority?: boolean | null
          is_reviewed?: boolean | null
          keywords?: string[] | null
          location?: string | null
          property_id?: number | null
          sentiment: Database["public"]["Enums"]["sentiment_type"]
          source: Database["public"]["Enums"]["comment_source"]
          updated_at?: string
        }
        Update: {
          client_name?: string
          comment_text?: string
          created_at?: string
          id?: number
          is_priority?: boolean | null
          is_reviewed?: boolean | null
          keywords?: string[] | null
          location?: string | null
          property_id?: number | null
          sentiment?: Database["public"]["Enums"]["sentiment_type"]
          source?: Database["public"]["Enums"]["comment_source"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_comments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_price_history: {
        Row: {
          bathrooms: number
          bedrooms: number
          date: string
          has_garden: boolean | null
          id: number
          location: string
          price: number
          property_id: number | null
          size: number
        }
        Insert: {
          bathrooms: number
          bedrooms: number
          date?: string
          has_garden?: boolean | null
          id?: number
          location: string
          price: number
          property_id?: number | null
          size: number
        }
        Update: {
          bathrooms?: number
          bedrooms?: number
          date?: string
          has_garden?: boolean | null
          id?: number
          location?: string
          price?: number
          property_id?: number | null
          size?: number
        }
        Relationships: [
          {
            foreignKeyName: "property_price_history_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_price_trends: {
        Args: {
          location_param: string
          start_date: string
          end_date: string
        }
        Returns: {
          average_price: number
          price_change_percentage: number
          date_group: string
        }[]
      }
    }
    Enums: {
      comment_source: "google" | "social_media" | "internal_form"
      sentiment_type: "positive" | "neutral" | "negative"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
