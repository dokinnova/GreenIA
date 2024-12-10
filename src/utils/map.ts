import L from 'leaflet';

// Función para obtener la posición de una propiedad a partir de su ubicación
export const getPropertyPosition = (location: string): [number, number] | null => {
  // Por ahora usamos posiciones fijas para demostración
  // En un caso real, usaríamos un servicio de geocodificación
  const locations: { [key: string]: [number, number] } = {
    'Madrid': [40.4168, -3.7038],
    'Barcelona': [41.3851, 2.1734],
    'Valencia': [39.4699, -0.3763],
    'Sevilla': [37.3891, -5.9845],
    'Bilbao': [43.2630, -2.9350],
  };

  return locations[location] || null;
};

// Icono personalizado para los marcadores del mapa
export const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});