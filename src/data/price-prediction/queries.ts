
import { supabase } from "@/integrations/supabase/client";
import { PriceTrend } from "./types";

export const getPriceTrends = async (
  location: string,
  startDate: Date,
  endDate: Date
): Promise<PriceTrend[]> => {
  const { data, error } = await supabase
    .rpc('get_price_trends', {
      location_param: location,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    });

  if (error) {
    console.error('Error fetching price trends:', error);
    throw error;
  }

  return data || [];
};

export const getLocations = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('location')
    .order('location');

  if (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }

  // Remove duplicates using Set
  const uniqueLocations = [...new Set(data.map(item => item.location))];
  return uniqueLocations;
};
