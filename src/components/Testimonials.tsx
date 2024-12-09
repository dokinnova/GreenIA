import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Compradora",
    content: "Encontré mi casa ideal en menos de una semana. El servicio fue excepcional y el proceso muy sencillo.",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Vendedor",
    content: "Vendí mi propiedad más rápido de lo que esperaba. La plataforma es muy intuitiva y el equipo muy profesional.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Inversora Inmobiliaria",
    content: "La mejor plataforma para encontrar propiedades de inversión. Los filtros son muy útiles y la información siempre está actualizada.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;