import { supabase } from "@/integrations/supabase/client";
import type { Property } from "./types";

export const fetchProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }

  return data || [];
};

export const createProperty = async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();

  if (error) {
    console.error('Error creating property:', error);
    throw error;
  }

  return data;
};

// Add new properties
export const addInitialProperties = async () => {
  const newProperties = [
    {
      title: "Villa de Lujo con Vistas al Mar",
      price: 850000,
      location: "Costa del Sol, Málaga",
      bedrooms: 4,
      bathrooms: 3,
      size: 350,
      has_garden: true,
      image_urls: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c5?w=800"
      ],
      keywords: ["lujo", "vistas al mar", "piscina"]
    },
    {
      title: "Ático Moderno en el Centro",
      price: 425000,
      location: "Salamanca, Madrid",
      bedrooms: 2,
      bathrooms: 2,
      size: 120,
      has_garden: false,
      image_urls: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
        "https://images.unsplash.com/photo-1502672023733-39d5b8f7c673?w=800"
      ],
      keywords: ["moderno", "céntrico", "terraza"]
    },
    {
      title: "Casa Rural con Encanto",
      price: 295000,
      location: "Sierra de Gredos, Ávila",
      bedrooms: 3,
      bathrooms: 2,
      size: 180,
      has_garden: true,
      image_urls: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1564013799932-ab600027ffc7?w=800",
        "https://images.unsplash.com/photo-1564013799945-ab600027ffc8?w=800"
      ],
      keywords: ["rural", "montaña", "tradicional"]
    }
  ];

  for (const property of newProperties) {
    try {
      await createProperty({
        ...property,
        image_url: property.image_urls[0] // Set first image as main image
      });
      console.log(`Created property: ${property.title}`);
    } catch (error) {
      console.error(`Error creating property ${property.title}:`, error);
    }
  }
};

export const updateProperty = async (id: number, updates: Partial<Omit<Property, 'id'>>) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating property:', error);
    throw error;
  }

  return data;
};

export const deleteProperty = async (id: number) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};