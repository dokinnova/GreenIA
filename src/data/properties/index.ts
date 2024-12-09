import { Property } from './types';
import { luxuryProperties } from './luxury-properties';
import { urbanProperties } from './urban-properties';
import { coastalProperties } from './coastal-properties';
import { ruralProperties } from './rural-properties';

export type { Property };

export const properties: Property[] = [
  ...luxuryProperties,
  ...urbanProperties,
  ...coastalProperties,
  ...ruralProperties
];

// Function to generate images for all properties
export const generateImagesForProperties = async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  for (const property of properties) {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-property-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: property.title,
          location: property.location
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      property.imageUrl = data.imageUrl;
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error generating image for property ${property.id}:`, error);
    }
  }
};