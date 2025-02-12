
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { TwoFactorToggle } from '@/components/profile/TwoFactorToggle';
import { ProfileForm } from '@/components/profile/ProfileForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    full_name: '',
    phone_number: '',
    email: '',
  });

  React.useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone_number, avatar_url, two_factor_enabled, email')
      .eq('id', user.id)
      .single();

    if (profile) {
      setFormValues({
        full_name: profile.full_name || '',
        phone_number: profile.phone_number || '',
        email: user.email || '',  // Usamos directamente el email del usuario de auth
      });
      setAvatarUrl(profile.avatar_url);
      setTwoFactorEnabled(profile.two_factor_enabled || false);
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tu Perfil</h1>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full"
            >
              <HomeIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <AvatarUpload
              avatarUrl={avatarUrl}
              fullName={formValues.full_name}
              onAvatarChange={setAvatarUrl}
            />
          </div>
          
          <ProfileForm
            defaultValues={formValues}
            onFormChange={(values) => setFormValues(values)}
          />

          <TwoFactorToggle
            enabled={twoFactorEnabled}
            onToggle={setTwoFactorEnabled}
          />

          <Button 
            type="button" 
            variant="destructive" 
            className="w-full mt-4"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
