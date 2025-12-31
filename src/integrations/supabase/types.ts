export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          privacy_accepted: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          privacy_accepted?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          privacy_accepted?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      partner_offers: {
        Row: {
          company_name: string
          contact_person: string
          created_at: string | null
          document_url: string | null
          email: string
          id: string
          phone: string | null
          pricing_details: string
          privacy_accepted: boolean
          region: string
          status: string | null
          validity_date: string | null
        }
        Insert: {
          company_name: string
          contact_person: string
          created_at?: string | null
          document_url?: string | null
          email: string
          id?: string
          phone?: string | null
          pricing_details: string
          privacy_accepted?: boolean
          region: string
          status?: string | null
          validity_date?: string | null
        }
        Update: {
          company_name?: string
          contact_person?: string
          created_at?: string | null
          document_url?: string | null
          email?: string
          id?: string
          phone?: string | null
          pricing_details?: string
          privacy_accepted?: boolean
          region?: string
          status?: string | null
          validity_date?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          company_name: string
          contact_person: string
          created_at: string | null
          custom_length: number | null
          custom_width: number | null
          delivery_address: string
          delivery_zip: string
          document_url: string | null
          email: string
          height_cm: number
          id: string
          is_express: boolean | null
          load_type: string
          needs_avis: boolean | null
          needs_insurance: boolean | null
          needs_liftgate: boolean | null
          pallet_count: number
          pallet_dimensions: string
          phone: string
          pickup_address: string
          pickup_zip: string
          privacy_accepted: boolean
          remarks: string | null
          shipping_date: string
          status: string | null
          temperature_controlled: boolean | null
          time_window: string | null
          total_weight_kg: number | null
          updated_at: string | null
          weight_per_pallet_kg: number
        }
        Insert: {
          company_name: string
          contact_person: string
          created_at?: string | null
          custom_length?: number | null
          custom_width?: number | null
          delivery_address: string
          delivery_zip: string
          document_url?: string | null
          email: string
          height_cm: number
          id?: string
          is_express?: boolean | null
          load_type?: string
          needs_avis?: boolean | null
          needs_insurance?: boolean | null
          needs_liftgate?: boolean | null
          pallet_count?: number
          pallet_dimensions?: string
          phone: string
          pickup_address: string
          pickup_zip: string
          privacy_accepted?: boolean
          remarks?: string | null
          shipping_date: string
          status?: string | null
          temperature_controlled?: boolean | null
          time_window?: string | null
          total_weight_kg?: number | null
          updated_at?: string | null
          weight_per_pallet_kg: number
        }
        Update: {
          company_name?: string
          contact_person?: string
          created_at?: string | null
          custom_length?: number | null
          custom_width?: number | null
          delivery_address?: string
          delivery_zip?: string
          document_url?: string | null
          email?: string
          height_cm?: number
          id?: string
          is_express?: boolean | null
          load_type?: string
          needs_avis?: boolean | null
          needs_insurance?: boolean | null
          needs_liftgate?: boolean | null
          pallet_count?: number
          pallet_dimensions?: string
          phone?: string
          pickup_address?: string
          pickup_zip?: string
          privacy_accepted?: boolean
          remarks?: string | null
          shipping_date?: string
          status?: string | null
          temperature_controlled?: boolean | null
          time_window?: string | null
          total_weight_kg?: number | null
          updated_at?: string | null
          weight_per_pallet_kg?: number
        }
        Relationships: []
      }
      tracking_shipments: {
        Row: {
          created_at: string | null
          current_status: Database["public"]["Enums"]["tracking_status"]
          destination_city: string
          estimated_delivery: string | null
          events: Json | null
          id: string
          origin_city: string
          recipient_name: string
          sender_name: string
          tracking_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_status?: Database["public"]["Enums"]["tracking_status"]
          destination_city: string
          estimated_delivery?: string | null
          events?: Json | null
          id?: string
          origin_city: string
          recipient_name: string
          sender_name: string
          tracking_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_status?: Database["public"]["Enums"]["tracking_status"]
          destination_city?: string
          estimated_delivery?: string | null
          events?: Json | null
          id?: string
          origin_city?: string
          recipient_name?: string
          sender_name?: string
          tracking_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      tracking_status:
        | "order_received"
        | "pickup_scheduled"
        | "picked_up"
        | "in_depot"
        | "out_for_delivery"
        | "delivered"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      tracking_status: [
        "order_received",
        "pickup_scheduled",
        "picked_up",
        "in_depot",
        "out_for_delivery",
        "delivered",
      ],
    },
  },
} as const
