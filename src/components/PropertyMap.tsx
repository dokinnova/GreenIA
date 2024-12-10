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
  // For now, return random coordinates around Madrid for demonstration
  // In a real app, you would use geocoding here
  const madridLat = 40.4168;
  const madridLng = -3.7038;
  const randomOffset = () => (Math.random() - 0.5) * 0.1; // Random offset ±0.05 degrees
  return [madridLat + randomOffset(), madridLng + randomOffset()];
};

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, onClose }) => {
  // Calculate center based on first property or default to Madrid
  const defaultPosition: [number, number] = properties.length > 0 
    ? getCoordinatesFromLocation(properties[0].location)
    : [40.4168, -3.7038]; // Madrid coordinates

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full w-10 h-10 p-0 flex items-center justify-center"
      >
        <X className="h-6 w-6" />
      </Button>
      
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={true}
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