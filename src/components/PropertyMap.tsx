import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/data/properties/types';
import L from 'leaflet';

// Arreglar el ícono del marcador de Leaflet
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
  // Coordenadas del centro de España como punto inicial
  const defaultCenter: [number, number] = [40.4168, -3.7038];
  
  // Función para convertir la dirección en coordenadas (mock por ahora)
  const getCoordinates = (location: string): [number, number] => {
    // Por ahora, generamos coordenadas aleatorias alrededor del centro de España
    const lat = defaultCenter[0] + (Math.random() - 0.5) * 2;
    const lng = defaultCenter[1] + (Math.random() - 0.5) * 2;
    return [lat, lng];
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
      <MapContainer
        center={defaultCenter}
        zoom={6}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map((property) => {
          const coordinates = getCoordinates(property.location);
          return (
            <Marker key={property.id} position={coordinates}>
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