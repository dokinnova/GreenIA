import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  imageUrl: string;
  keywords: string[];
  hasGarden: boolean;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Ático de lujo con terraza",
    price: 450000,
    location: "Barcelona, Eixample",
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "lujo", "terraza"],
    hasGarden: false
  },
  {
    id: 2,
    title: "Piso reformado en zona céntrica",
    price: 280000,
    location: "Madrid, Salamanca",
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "reformado", "céntrico"],
    hasGarden: false
  },
  {
    id: 3,
    title: "Chalet con piscina",
    price: 750000,
    location: "Valencia, La Eliana",
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "piscina", "jardín"],
    hasGarden: true
  },
  {
    id: 4,
    title: "Apartamento moderno con vistas al mar",
    price: 320000,
    location: "Málaga, Centro",
    bedrooms: 2,
    bathrooms: 2,
    size: 90,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "moderno", "vistas", "mar"],
    hasGarden: false
  },
  {
    id: 5,
    title: "Villa de lujo con jardín privado",
    price: 890000,
    location: "Marbella, Golden Mile",
    bedrooms: 5,
    bathrooms: 4,
    size: 350,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "lujo", "jardín"],
    hasGarden: true
  },
  {
    id: 6,
    title: "Dúplex con terraza panorámica",
    price: 420000,
    location: "Sevilla, Triana",
    bedrooms: 3,
    bathrooms: 2,
    size: 140,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["dúplex", "terraza", "vistas"],
    hasGarden: false
  },
  {
    id: 7,
    title: "Casa rural con huerto",
    price: 245000,
    location: "Granada, Alpujarra",
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "rural", "huerto"],
    hasGarden: true
  },
  {
    id: 8,
    title: "Ático dúplex con solárium",
    price: 550000,
    location: "Valencia, Ciudad de las Artes",
    bedrooms: 3,
    bathrooms: 2,
    size: 160,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "dúplex", "solárium"],
    hasGarden: false
  },
  {
    id: 9,
    title: "Piso de diseño en casco histórico",
    price: 395000,
    location: "Toledo, Centro",
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "diseño", "histórico"],
    hasGarden: false
  },
  {
    id: 10,
    title: "Chalet adosado con piscina comunitaria",
    price: 320000,
    location: "Alicante, Playa San Juan",
    bedrooms: 3,
    bathrooms: 2,
    size: 140,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "adosado", "piscina"],
    hasGarden: false
  },
  {
    id: 11,
    title: "Apartamento primera línea de playa",
    price: 280000,
    location: "Benidorm, Levante",
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "playa"],
    hasGarden: false
  },
  {
    id: 12,
    title: "Villa moderna con infinity pool",
    price: 1200000,
    location: "Ibiza, Santa Eulalia",
    bedrooms: 4,
    bathrooms: 4,
    size: 300,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "moderna", "piscina"],
    hasGarden: false
  },
  {
    id: 13,
    title: "Loft industrial reformado",
    price: 295000,
    location: "Barcelona, Poblenou",
    bedrooms: 1,
    bathrooms: 1,
    size: 85,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["loft", "industrial", "reformado"],
    hasGarden: false
  },
  {
    id: 14,
    title: "Casa señorial con bodega",
    price: 680000,
    location: "La Rioja, Haro",
    bedrooms: 5,
    bathrooms: 3,
    size: 400,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "señorial", "bodega"],
    hasGarden: false
  },
  {
    id: 15,
    title: "Ático con vistas a la catedral",
    price: 475000,
    location: "Burgos, Centro",
    bedrooms: 3,
    bathrooms: 2,
    size: 130,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "vistas", "céntrico"],
    hasGarden: false
  },
  {
    id: 16,
    title: "Piso modernista en el Ensanche",
    price: 520000,
    location: "Barcelona, Eixample Dret",
    bedrooms: 3,
    bathrooms: 2,
    size: 145,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "modernista", "ensanche"],
    hasGarden: false
  },
  {
    id: 17,
    title: "Chalet de lujo con campo de golf",
    price: 1500000,
    location: "Marbella, Nueva Andalucía",
    bedrooms: 6,
    bathrooms: 5,
    size: 500,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "lujo", "golf"],
    hasGarden: false
  },
  {
    id: 18,
    title: "Apartamento en puerto deportivo",
    price: 350000,
    location: "Mallorca, Puerto Portals",
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "puerto", "náutico"],
    hasGarden: false
  },
  {
    id: 19,
    title: "Villa contemporánea con spa",
    price: 950000,
    location: "Costa Brava, Begur",
    bedrooms: 4,
    bathrooms: 3,
    size: 280,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "contemporánea", "spa"],
    hasGarden: false
  },
  {
    id: 20,
    title: "Dúplex con jardín zen",
    price: 420000,
    location: "Madrid, Chamartín",
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["dúplex", "jardín", "zen"],
    hasGarden: true
  },
  {
    id: 21,
    title: "Casa de pueblo restaurada",
    price: 180000,
    location: "Asturias, Covadonga",
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "pueblo", "restaurada"],
    hasGarden: true
  },
  {
    id: 22,
    title: "Ático con piscina privada",
    price: 890000,
    location: "Valencia, Ciutat Vella",
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "piscina", "privada"],
    hasGarden: true
  },
  {
    id: 23,
    title: "Piso señorial en Paseo de Gracia",
    price: 1200000,
    location: "Barcelona, Paseo de Gracia",
    bedrooms: 4,
    bathrooms: 3,
    size: 220,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "señorial", "lujo"],
    hasGarden: false
  },
  {
    id: 24,
    title: "Chalet con vistas al mar",
    price: 850000,
    location: "Sitges, Centro",
    bedrooms: 5,
    bathrooms: 4,
    size: 320,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "vistas", "mar"],
    hasGarden: true
  }
];

// Function to generate images for all properties
export const generateImagesForProperties = async () => {
  console.log('Starting image generation for properties...');
  
  for (const property of properties) {
    try {
      console.log(`Generating image for property ${property.id}: ${property.title}`);
      
      const { data, error } = await supabase.functions.invoke('generate-property-image', {
        body: {
          title: property.title,
          location: property.location
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log(`Successfully generated image for property ${property.id}`);
      property.imageUrl = data.imageUrl;
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating image for property ${property.id}:`, error);
      throw error; // Re-throw to handle in the component
    }
  }
};