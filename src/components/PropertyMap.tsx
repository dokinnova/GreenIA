import React, { useEffect, useState } from 'react';
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

interface GeocodingResult {
  lat: string;
  lon: string;
}

const PropertyMap = ({ properties, onClose }: PropertyMapProps) => {
  // Default center coordinates (center of Spain)
  const defaultCenter: L.LatLngExpression = [40.4168, -3.7038];
  const [propertyCoordinates, setPropertyCoordinates] = useState<Map<number, L.LatLngExpression>>(new Map());
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(defaultCenter);
  const [isLoading, setIsLoading] = useState(true);

  // Function to convert address to coordinates using Nominatim
  const getCoordinates = async (location: string): Promise<L.LatLngExpression | null> => {
    try {
      const encodedLocation = encodeURIComponent(location + ', España');
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}`
      );
      const data: GeocodingResult[] = await response.json();

      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      console.warn(`No coordinates found for location: ${location}`);
      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadCoordinates = async () => {
      const coordinates = new Map<number, L.LatLngExpression>();
      let validCoordinatesCount = 0;
      let sumLat = 0;
      let sumLng = 0;

      // Add delay between requests to respect Nominatim's usage policy
      for (const property of properties) {
        const coords = await getCoordinates(property.location);
        if (coords) {
          coordinates.set(property.id, coords);
          sumLat += (coords as [number, number])[0];
          sumLng += (coords as [number, number])[1];
          validCoordinatesCount++;
        }
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setPropertyCoordinates(coordinates);
      
      // Calculate new center if we have valid coordinates
      if (validCoordinatesCount > 0) {
        setMapCenter([sumLat / validCoordinatesCount, sumLng / validCoordinatesCount]);
      }

      setIsLoading(false);
    };

    loadCoordinates();
  }, [properties]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p>Cargando ubicaciones...</p>
        </div>
      </div>
    );
  }

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
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
        key={mapCenter.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.from(propertyCoordinates.entries()).map(([id, coordinates]) => {
          const property = properties.find(p => p.id === id);
          if (!property) return null;

          return (
            <Marker 
              key={id} 
              position={coordinates}
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