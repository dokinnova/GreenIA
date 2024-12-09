import React from 'react';
import PropertyCard from '../components/PropertyCard';
import Chatbot from '../components/Chatbot';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';

const properties = [
  {
    id: 1,
    title: "Ático de lujo con terraza",
    price: 450000,
    location: "Barcelona, Eixample",
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  },
  {
    id: 2,
    title: "Piso reformado en zona céntrica",
    price: 280000,
    location: "Madrid, Salamanca",
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    id: 3,
    title: "Chalet con piscina",
    price: 750000,
    location: "Valencia, La Eliana",
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl mb-8">
            Miles de propiedades te están esperando
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input 
              placeholder="Buscar por ubicación..." 
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-primary hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto py-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          Propiedades destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;