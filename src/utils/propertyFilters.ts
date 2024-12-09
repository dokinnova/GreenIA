import { PropertyFilters } from '../components/Chatbot';

export const extractPropertyFilters = (text: string, currentFilters: PropertyFilters): PropertyFilters => {
  const normalizedText = text.toLowerCase();
  const newFilters: PropertyFilters = { ...currentFilters };
  
  // Extraer número de baños con expresiones más específicas
  const bathroomsMatch = normalizedText.match(/(\d+)\s*(baños?|aseos?|wc|cuarto de baño)/);
  if (bathroomsMatch) {
    const numBathrooms = parseInt(bathroomsMatch[1]);
    console.log('Número de baños detectado:', numBathrooms);
    newFilters.bathrooms = numBathrooms;
  }

  // Extraer número de habitaciones
  const bedroomsMatch = normalizedText.match(/(\d+)\s*(habitaciones?|dormitorios?|hab)/);
  if (bedroomsMatch) {
    newFilters.bedrooms = parseInt(bedroomsMatch[1]);
  }

  // Extraer rango de precios
  const priceMatch = normalizedText.match(/(\d+)\s*(mil|k|millones?)?(\s*-\s*(\d+)\s*(mil|k|millones?))?\s*(€|euros)/i);
  if (priceMatch) {
    let minPrice = parseInt(priceMatch[1]);
    if (priceMatch[2] && priceMatch[2].match(/mil|k/i)) minPrice *= 1000;
    if (priceMatch[2] && priceMatch[2].match(/millones/i)) minPrice *= 1000000;
    newFilters.minPrice = minPrice;

    if (priceMatch[4]) {
      let maxPrice = parseInt(priceMatch[4]);
      if (priceMatch[5] && priceMatch[5].match(/mil|k/i)) maxPrice *= 1000;
      if (priceMatch[5] && priceMatch[5].match(/millones/i)) maxPrice *= 1000000;
      newFilters.maxPrice = maxPrice;
    }
  }

  // Extraer tamaño
  const sizeMatch = normalizedText.match(/(\d+)\s*(m2|metros\s*cuadrados|m²)/i);
  if (sizeMatch) {
    newFilters.minSize = parseInt(sizeMatch[1]);
  }

  // Mantener las palabras clave existentes y agregar nuevas
  const keywordMappings = {
    'familia grande': ['grande', 'espacioso'],
    'niños': ['jardín', 'seguro'],
    'perro': ['jardín'],
    'mascota': ['jardín'],
    'grande': ['grande', 'espacioso'],
    'espacioso': ['grande'],
    'jardín': ['jardín'],
    'piscina': ['piscina'],
    'terraza': ['terraza'],
    'ático': ['ático'],
    'lujo': ['lujo'],
    'reformado': ['reformado'],
    'céntrico': ['céntrico'],
    'moderno': ['moderno'],
    'vistas': ['vistas'],
    'casa': ['casa']
  };

  const newKeywords = new Set<string>(newFilters.keywords || []);
  Object.entries(keywordMappings).forEach(([key, relatedKeywords]) => {
    if (normalizedText.includes(key)) {
      relatedKeywords.forEach(keyword => newKeywords.add(keyword));
    }
  });

  newFilters.keywords = Array.from(newKeywords);
  
  console.log('Filtros extraídos:', newFilters);
  return newFilters;
};