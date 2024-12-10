import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/data/properties/types';
import L from 'leaflet';
import { X } from 'lucide-react';
import { Button } from './ui/button';

// Fix Leaflet's default icon issue
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

const PropertyMap = ({ properties, onClose }: PropertyMapProps) => {
  // Default center coordinates (center of Spain)
  const defaultCenter: [number, number] = [40.4168, -3.7038];
  
  // Function to convert address to coordinates (mock for now)
  const getCoordinates = (location: string): [number, number] => {
    // Generate random coordinates around Spain's center for now
    const lat = defaultCenter[0] + (Math.random() - 0.5) * 2;
    const lng = defaultCenter[1] + (Math.random() - 0.5) * 2;
    return [lat, lng];
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="absolute top-4 right-4 z-[1000]">
        <Button
          onClick={onClose}
          variant="secondary"
          size="icon"
          className="rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <MapContainer
        className="h-screen w-full"
        center={defaultCenter as L.LatLngExpression}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          const coordinates = getCoordinates(property.location);
          return (
            <Marker 
              key={property.id} 
              position={coordinates as L.LatLngExpression}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{property.title}</h3>
                  <p className="text-sm">{property.location}</p>
                  <p className="text-sm font-semibold">{property.price.toLocaleString('es-ES')} €</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;