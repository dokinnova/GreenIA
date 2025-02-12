
import { PropertyFilters } from '../components/Chatbot';
import type { Property } from '@/data/properties/types';

export const extractPropertyFilters = (text: string, currentFilters: PropertyFilters): PropertyFilters => {
  const normalizedText = text.toLowerCase();
  const newFilters: PropertyFilters = { ...currentFilters };
  
  // Extraer número de baños con expresiones más específicas
  const bathroomsMatch = normalizedText.match(/(\d+)\s*(baños?|aseos?|wc|cuarto de baño|baño)/i);
  if (bathroomsMatch) {
    const numBathrooms = parseInt(bathroomsMatch[1]);
    console.log('Número de baños detectado:', numBathrooms);
    newFilters.bathrooms = numBathrooms;
  }

  // Extraer número de habitaciones
  const bedroomsMatch = normalizedText.match(/(\d+)\s*(habitaciones?|dormitorios?|hab)/i);
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

export const filterProperties = (properties: Property[], filters: PropertyFilters): Property[] => {
  console.log('Aplicando filtros:', filters);
  console.log('Total de propiedades antes del filtrado:', properties.length);

  const filtered = properties.filter(property => {
    // Inicializamos matches como true
    let matches = true;

    // Filtrar por número de baños
    if (filters.bathrooms !== undefined) {
      console.log(`Propiedad ${property.id} - Comparando baños:`, {
        propiedad: property.bathrooms,
        filtro: filters.bathrooms,
        coincide: property.bathrooms === filters.bathrooms
      });
      matches = matches && property.bathrooms === filters.bathrooms;
    }

    // Filtrar por número de habitaciones
    if (matches && filters.bedrooms !== undefined) {
      matches = matches && property.bedrooms === filters.bedrooms;
    }

    // Filtrar por precio
    if (matches && filters.minPrice !== undefined) {
      matches = matches && property.price >= filters.minPrice;
    }
    if (matches && filters.maxPrice !== undefined) {
      matches = matches && property.price <= filters.maxPrice;
    }

    // Filtrar por tamaño
    if (matches && filters.minSize !== undefined) {
      matches = matches && property.size >= filters.minSize;
    }
    if (matches && filters.maxSize !== undefined) {
      matches = matches && property.size <= filters.maxSize;
    }

    // Filtrar por palabras clave
    if (matches && filters.keywords && filters.keywords.length > 0) {
      const propertyText = [
        property.title.toLowerCase(),
        property.location.toLowerCase(),
        ...(property.keywords?.map(k => k.toLowerCase()) || [])
      ].join(' ');

      // Una propiedad coincide si contiene al menos una de las palabras clave
      const keywordMatches = filters.keywords.some(keyword => 
        propertyText.includes(keyword.toLowerCase()) ||
        (keyword === 'jardín' && property.has_garden)
      );
      
      matches = matches && keywordMatches;
    }

    return matches;
  });

  console.log(`Se encontraron ${filtered.length} propiedades que coinciden con los filtros`);
  filtered.forEach(p => console.log('Propiedad coincidente:', { id: p.id, title: p.title }));
  return filtered;
};
