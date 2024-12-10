import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Checkbox } from './ui/checkbox';
import { useToast } from './ui/use-toast';
import { createProperty } from '@/data/properties/queries';
import { useQueryClient } from '@tanstack/react-query';
import type { Property } from '@/data/properties/types';
import { Plus, X } from 'lucide-react';

type PropertyFormData = Omit<Property, 'id' | 'created_at' | 'updated_at'>;

export function AddPropertyForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  
  const form = useForm<PropertyFormData>({
    defaultValues: {
      title: '',
      price: 0,
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      size: 0,
      image_url: '',
      image_urls: [],
      keywords: [],
      has_garden: false
    }
  });

  const onSubmit = async (data: PropertyFormData) => {
    try {
      console.log('Submitting with imageUrls:', imageUrls);
      
      // Asegurarnos de que image_urls se envía como un array
      const propertyData = {
        ...data,
        image_urls: imageUrls,
        // Si hay imágenes, usar la primera como image_url principal
        image_url: imageUrls.length > 0 ? imageUrls[0] : null
      };

      console.log('Property data to submit:', propertyData);

      await createProperty(propertyData);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Propiedad creada",
        description: "La propiedad se ha añadido correctamente",
      });
      form.reset();
      setImageUrls([]);
      onSuccess?.();
    } catch (error) {
      console.error('Error creating property:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la propiedad",
        variant: "destructive",
      });
    }
  };

  const addImageUrl = () => {
    const newUrl = form.getValues('image_url');
    if (newUrl && !imageUrls.includes(newUrl)) {
      setImageUrls(prev => [...prev, newUrl]);
      form.setValue('image_url', '');
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ático con vistas al mar..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Barcelona, Eixample..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habitaciones</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baños</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamaño (m²)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URLs de imágenes</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} placeholder="https://..." />
                  </FormControl>
                  <Button type="button" onClick={addImageUrl} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Imágenes añadidas:</p>
              <div className="space-y-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                    <span className="text-sm truncate flex-1">{url}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="has_garden"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Tiene jardín</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Crear Propiedad
        </Button>
      </form>
    </Form>
  );
}