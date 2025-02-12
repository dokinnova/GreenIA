
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ProfileFormValues {
  full_name: string;
  phone_number: string;
  email: string;
}

interface ProfileFormProps {
  defaultValues: ProfileFormValues;
  onFormChange?: (values: ProfileFormValues) => void;
}

export const ProfileForm = ({ defaultValues, onFormChange }: ProfileFormProps) => {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    defaultValues,
  });

  React.useEffect(() => {
    console.log('Default values changed:', defaultValues);
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log('Submitting form with data:', data);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('No user found');
        toast({
          title: 'Error',
          description: 'Usuario no encontrado',
          variant: 'destructive',
        });
        return;
      }
      
      console.log('Updating profile for user:', user.id);
      
      // Actualizar el perfil
      const { error: updateError, data: updateData } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone_number: data.phone_number,
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el perfil',
          variant: 'destructive',
        });
        return;
      }

      console.log('Profile updated successfully:', updateData);

      // Obtener los datos actualizados
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('Error fetching updated profile:', fetchError);
      } else {
        console.log('Retrieved updated profile:', updatedProfile);
        // Actualizar el formulario con los nuevos datos
        const updatedValues = {
          ...data,
          full_name: updatedProfile.full_name || '',
          phone_number: updatedProfile.phone_number || '',
        };
        console.log('Setting new form values:', updatedValues);
        form.reset(updatedValues);
        onFormChange?.(updatedValues);
      }

      toast({
        title: 'Éxito',
        description: 'Perfil actualizado correctamente',
      });
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast({
        title: 'Error',
        description: 'Ocurrió un error al actualizar el perfil',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled 
                  className="bg-gray-100 text-gray-900 font-medium border-gray-300" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Tu número de teléfono" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Guardar cambios
        </Button>
      </form>
    </Form>
  );
};
