
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
  email?: string;
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
    const subscription = form.watch((value) => {
      onFormChange?.(value as ProfileFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onFormChange]);

  const onSubmit = async (data: ProfileFormValues) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.full_name,
        phone_number: data.phone_number,
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el perfil',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Éxito',
        description: 'Perfil actualizado correctamente',
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
                <Input {...field} disabled className="bg-gray-50" />
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
