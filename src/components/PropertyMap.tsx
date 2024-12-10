import React from 'react';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup as LeafletPopup } from 'react-leaflet';
import type { Property } from '@/data/properties/types';
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

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, onClose }) => {
  const defaultPosition: [number, number] = [40.4168, -3.7038]; // Madrid coordinates

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg"
      >
        ×
      </button>
      <MapContainer
        className="h-full w-full"
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map((property) => (
          <LeafletMarker
            key={property.id}
            position={[40.4168, -3.7038]} // You should replace this with actual coordinates
          >
            <LeafletPopup>
              <div>
                <h3 className="font-bold">{property.title}</h3>
                <p>{property.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </LeafletPopup>
          </LeafletMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;