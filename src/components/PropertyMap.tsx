import React from 'react';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup as LeafletPopup } from 'react-leaflet';
import type { Property } from '@/data/properties/types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
  onClose: () => void;
}

// Helper function to extract coordinates from location string
const getCoordinatesFromLocation = (location: string): [number, number] => {
  // Mapa de ubicaciones con sus coordenadas
  const locationMap: { [key: string]: [number, number] } = {
    // Madrid y alrededores
    'Madrid Centro': [40.4168, -3.7038],
    'Salamanca': [40.4255, -3.6857],
    'Chamberí': [40.4352, -3.7035],
    'Retiro': [40.4146, -3.6836],
    'La Latina': [40.4098, -3.7097],
    'Malasaña': [40.4260, -3.7038],
    'Chueca': [40.4231, -3.6952],
    'Lavapiés': [40.4107, -3.7014],
    'Chamartín': [40.4677, -3.6773],
    'Tetuán': [40.4594, -3.6975],
    'Arganzuela': [40.4008, -3.6999],
    'Moncloa': [40.4356, -3.7185],
    'Barrio de Las Letras': [40.4140, -3.6977],
    'Atocha': [40.4079, -3.6908],
    // Otras ciudades importantes
    'Barcelona': [41.3851, 2.1734],
    'Valencia': [39.4699, -0.3763],
    'Sevilla': [37.3891, -5.9845],
    'Zaragoza': [41.6488, -0.8891],
    'Málaga': [36.7213, -4.4217],
    'Bilbao': [43.2630, -2.9350],
    'Alicante': [38.3452, -0.4815],
    'Córdoba': [37.8882, -4.7794],
    'Granada': [37.1773, -3.5986],
    'Vigo': [42.2406, -8.7207],
    'Gijón': [43.5322, -5.6611],
    'San Sebastián': [43.3183, -1.9812],
  };

  // Buscar la ubicación en el mapa
  for (const [key, coords] of Object.entries(locationMap)) {
    if (location.toLowerCase().includes(key.toLowerCase())) {
      return coords;
    }
  }

  // Si no se encuentra una coincidencia exacta, devolver coordenadas del centro de España
  console.log(`No se encontraron coordenadas exactas para: ${location}, usando centro de España como fallback`);
  return [40.4637, -3.7492]; // Centro aproximado de España
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, onClose }) => {
  // Centrar en el centro de España y usar un zoom que muestre toda la península
  const defaultPosition: [number, number] = [40.4637, -3.7492];

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          onClick={onClose}
          variant="secondary"
          size="icon"
          className="bg-white hover:bg-gray-100 shadow-lg rounded-full w-12 h-12"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <MapContainer
        defaultCenter={defaultPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((property) => {
          const coordinates = getCoordinatesFromLocation(property.location);
          return (
            <LeafletMarker
              key={property.id}
              position={coordinates}
            >
              <LeafletPopup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                  <p className="font-semibold">
                    {property.price.toLocaleString('es-ES', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </p>
                </div>
              </LeafletPopup>
            </LeafletMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;