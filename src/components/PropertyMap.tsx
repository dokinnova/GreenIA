
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import type { PropertyMapProps } from '@/data/properties/types';
import { getPropertyPosition } from '@/utils/map';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, Map as LeafletMap } from 'leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ properties, onClose }: PropertyMapProps) => {
  const defaultPosition: LatLngExpression = [40.4168, -3.7038]; // Madrid as default position
  const mapRef = React.useRef<LeafletMap>(null);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <MapContainer
        ref={mapRef}
        className="z-0"
        style={{ height: '100%', width: '100%' }}
        zoom={6}
        center={defaultPosition}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => {
          const position = getPropertyPosition(property.location);
          if (!position) return null;

          return (
            <Marker 
              key={property.id} 
              position={position}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="font-semibold mt-1">€{property.price.toLocaleString()}</p>
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
