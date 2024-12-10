import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PropertyMapProps {
  properties: any[];
  onClose: () => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, onClose }) => {
  const defaultCenter = [51.505, -0.09]; // Example coordinates

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="h-full relative">
        <Button
          variant="outline"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <MapContainer
          className="h-full w-full"
          center={defaultCenter as [number, number]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properties.map((property) => (
            <Marker key={property.id} position={[property.latitude, property.longitude]}>
              <Popup>{property.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;
