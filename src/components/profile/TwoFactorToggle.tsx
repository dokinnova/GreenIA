
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TwoFactorToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const TwoFactorToggle = ({ enabled, onToggle }: TwoFactorToggleProps) => {
  const { toast } = useToast();

  const handleTwoFactorToggle = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newTwoFactorEnabled = !enabled;

    const { error } = await supabase
      .from('profiles')
      .update({
        two_factor_enabled: newTwoFactorEnabled,
      })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la configuración de 2FA',
        variant: 'destructive',
      });
    } else {
      onToggle(newTwoFactorEnabled);
      toast({
        title: 'Éxito',
        description: `Autenticación de dos factores ${newTwoFactorEnabled ? 'activada' : 'desactivada'} correctamente`,
      });
    }
  };

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex flex-col space-y-1">
        <span className="font-medium">Autenticación de dos factores</span>
        <span className="text-sm text-gray-500">
          {enabled ? 'Activada' : 'Desactivada'}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {enabled ? (
          <ShieldCheck className="h-4 w-4 text-green-500" />
        ) : (
          <ShieldOff className="h-4 w-4 text-gray-400" />
        )}
        <Switch
          checked={enabled}
          onCheckedChange={handleTwoFactorToggle}
        />
      </div>
    </div>
  );
};
