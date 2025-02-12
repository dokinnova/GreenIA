
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
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
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      full_name: '',
      phone_number: '',
    },
  });

  React.useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone_number')
      .eq('id', user.id)
      .single();

    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        phone_number: profile.phone_number || '',
      });
    }
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Tu Perfil</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
                  Guardar cambios
                </Button>
                <Button 
                  type="button" 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
