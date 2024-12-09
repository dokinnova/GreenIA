import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Chatbot from '../components/Chatbot';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const properties = [
  {
    id: 1,
    title: "Ático de lujo con terraza",
    price: 450000,
    location: "Barcelona, Eixample",
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "lujo", "terraza"]
  },
  {
    id: 2,
    title: "Piso reformado en zona céntrica",
    price: 280000,
    location: "Madrid, Salamanca",
    bedrooms: 2,
    bathrooms: 1,
    size: 85,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "reformado", "céntrico"]
  },
  {
    id: 3,
    title: "Chalet con piscina",
    price: 750000,
    location: "Valencia, La Eliana",
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "piscina", "jardín"]
  },
  {
    id: 4,
    title: "Apartamento moderno con vistas al mar",
    price: 320000,
    location: "Málaga, Centro",
    bedrooms: 2,
    bathrooms: 2,
    size: 90,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "moderno", "vistas", "mar"]
  },
  {
    id: 5,
    title: "Villa de lujo con jardín privado",
    price: 890000,
    location: "Marbella, Golden Mile",
    bedrooms: 5,
    bathrooms: 4,
    size: 350,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "lujo", "jardín"]
  },
  {
    id: 6,
    title: "Dúplex con terraza panorámica",
    price: 420000,
    location: "Sevilla, Triana",
    bedrooms: 3,
    bathrooms: 2,
    size: 140,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["dúplex", "terraza", "vistas"]
  },
  {
    id: 7,
    title: "Casa rural con huerto",
    price: 245000,
    location: "Granada, Alpujarra",
    bedrooms: 4,
    bathrooms: 2,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "rural", "huerto"]
  },
  {
    id: 8,
    title: "Ático dúplex con solárium",
    price: 550000,
    location: "Valencia, Ciudad de las Artes",
    bedrooms: 3,
    bathrooms: 2,
    size: 160,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "dúplex", "solárium"]
  },
  {
    id: 9,
    title: "Piso de diseño en casco histórico",
    price: 395000,
    location: "Toledo, Centro",
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "diseño", "histórico"]
  },
  {
    id: 10,
    title: "Chalet adosado con piscina comunitaria",
    price: 320000,
    location: "Alicante, Playa San Juan",
    bedrooms: 3,
    bathrooms: 2,
    size: 140,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "adosado", "piscina"]
  },
  {
    id: 11,
    title: "Apartamento primera línea de playa",
    price: 280000,
    location: "Benidorm, Levante",
    bedrooms: 2,
    bathrooms: 1,
    size: 75,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "playa"]
  },
  {
    id: 12,
    title: "Villa moderna con infinity pool",
    price: 1200000,
    location: "Ibiza, Santa Eulalia",
    bedrooms: 4,
    bathrooms: 4,
    size: 300,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "moderna", "piscina"]
  },
  {
    id: 13,
    title: "Loft industrial reformado",
    price: 295000,
    location: "Barcelona, Poblenou",
    bedrooms: 1,
    bathrooms: 1,
    size: 85,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["loft", "industrial", "reformado"]
  },
  {
    id: 14,
    title: "Casa señorial con bodega",
    price: 680000,
    location: "La Rioja, Haro",
    bedrooms: 5,
    bathrooms: 3,
    size: 400,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "señorial", "bodega"]
  },
  {
    id: 15,
    title: "Ático con vistas a la catedral",
    price: 475000,
    location: "Burgos, Centro",
    bedrooms: 3,
    bathrooms: 2,
    size: 130,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "vistas", "céntrico"]
  },
  {
    id: 16,
    title: "Piso modernista en el Ensanche",
    price: 520000,
    location: "Barcelona, Eixample Dret",
    bedrooms: 3,
    bathrooms: 2,
    size: 145,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "modernista", "ensanche"]
  },
  {
    id: 17,
    title: "Chalet de lujo con campo de golf",
    price: 1500000,
    location: "Marbella, Nueva Andalucía",
    bedrooms: 6,
    bathrooms: 5,
    size: 500,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "lujo", "golf"]
  },
  {
    id: 18,
    title: "Apartamento en puerto deportivo",
    price: 350000,
    location: "Mallorca, Puerto Portals",
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    imageUrl: "https://images.unsplash.com/photo-1464146344425-f00d5f5c8f07",
    keywords: ["apartamento", "puerto", "náutico"]
  },
  {
    id: 19,
    title: "Villa contemporánea con spa",
    price: 950000,
    location: "Costa Brava, Begur",
    bedrooms: 4,
    bathrooms: 3,
    size: 280,
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    keywords: ["villa", "contemporánea", "spa"]
  },
  {
    id: 20,
    title: "Dúplex con jardín zen",
    price: 420000,
    location: "Madrid, Chamartín",
    bedrooms: 3,
    bathrooms: 2,
    size: 150,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    keywords: ["dúplex", "jardín", "zen"]
  },
  {
    id: 21,
    title: "Casa de pueblo restaurada",
    price: 180000,
    location: "Asturias, Covadonga",
    bedrooms: 4,
    bathrooms: 2,
    size: 200,
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    keywords: ["casa", "pueblo", "restaurada"]
  },
  {
    id: 22,
    title: "Ático con piscina privada",
    price: 890000,
    location: "Valencia, Ciutat Vella",
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    keywords: ["ático", "piscina", "privada"]
  },
  {
    id: 23,
    title: "Piso señorial en Paseo de Gracia",
    price: 1200000,
    location: "Barcelona, Paseo de Gracia",
    bedrooms: 4,
    bathrooms: 3,
    size: 220,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    keywords: ["piso", "señorial", "lujo"]
  },
  {
    id: 24,
    title: "Chalet con vistas al mar",
    price: 850000,
    location: "Sitges, Centro",
    bedrooms: 5,
    bathrooms: 4,
    size: 320,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    keywords: ["chalet", "vistas", "mar"]
  }
];

export type Property = typeof properties[0];

const Index = () => {
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<number | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  // Calcular propiedades para la página actual
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              isHighlighted={property.id === highlightedPropertyId}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => prev - 1);
                  }} 
                />
              </PaginationItem>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => prev + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {/* Chatbot with filtering capabilities */}
      <Chatbot 
        onFilter={(keywords: string[]) => {
          const filtered = properties.filter(property => 
            keywords.some(keyword => 
              property.keywords.includes(keyword.toLowerCase()) ||
              property.title.toLowerCase().includes(keyword.toLowerCase()) ||
              property.location.toLowerCase().includes(keyword.toLowerCase())
            )
          );
          setFilteredProperties(filtered);
          setCurrentPage(1); // Resetear a la primera página cuando se filtra
          if (filtered.length === 1) {
            setHighlightedPropertyId(filtered[0].id);
          } else {
            setHighlightedPropertyId(null);
          }
        }}
        onResetFilter={() => {
          setFilteredProperties(properties);
          setHighlightedPropertyId(null);
          setCurrentPage(1); // Resetear a la primera página cuando se limpia el filtro
        }}
      />
    </div>
  );
};

export default Index;