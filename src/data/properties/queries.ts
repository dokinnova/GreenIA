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
      price_rating: 2,
      quality_rating: 5,
      location_rating: 5,
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
      price_rating: 3,
      quality_rating: 4,
      location_rating: 5,
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
      price_rating: 4,
      quality_rating: 3,
      location_rating: 4,
      image_urls: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1564013799932-ab600027ffc7?w=800",
        "https://images.unsplash.com/photo-1564013799945-ab600027ffc8?w=800"
      ],
      keywords: ["rural", "montaña", "tradicional"]
    },
    {
      title: "Piso Reformado en Zona Histórica",
      price: 320000,
      location: "Casco Antiguo, Toledo",
      bedrooms: 2,
      bathrooms: 1,
      size: 95,
      has_garden: false,
      price_rating: 4,
      quality_rating: 4,
      location_rating: 5,
      image_urls: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800",
        "https://images.unsplash.com/photo-1560448204-61dc36dc98c9?w=800"
      ],
      keywords: ["reformado", "histórico", "céntrico"]
    },
    {
      title: "Chalet Familiar con Piscina",
      price: 550000,
      location: "La Moraleja, Madrid",
      bedrooms: 5,
      bathrooms: 3,
      size: 280,
      has_garden: true,
      price_rating: 3,
      quality_rating: 5,
      location_rating: 5,
      image_urls: [
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f84?w=800",
        "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f85?w=800"
      ],
      keywords: ["familiar", "piscina", "jardín"]
    },
    {
      title: "Apartamento con Vistas a la Playa",
      price: 385000,
      location: "Playa de San Juan, Alicante",
      bedrooms: 3,
      bathrooms: 2,
      size: 110,
      has_garden: false,
      price_rating: 3,
      quality_rating: 4,
      location_rating: 5,
      image_urls: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c751?w=800",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c752?w=800"
      ],
      keywords: ["playa", "vistas", "primera línea"]
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
