import L from 'leaflet';

export const getPropertyPosition = (location: string): [number, number] | null => {
  // Madrid coordinates as fallback
  return [40.4168, -3.7038];
};

// Custom icon for map markers
export const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});