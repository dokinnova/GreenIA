
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');  // Cambiado de '/profile' a '/dashboard'
      }
    });

    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');  // Cambiado de '/profile' a '/dashboard'
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Acceso al Panel de Control</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          view="sign_in"
          showLinks={true}
          redirectTo={`${window.location.origin}/dashboard`}  // Cambiado de '/profile' a '/dashboard'
          localization={{
            variables: {
              sign_up: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                email_input_placeholder: "Tu correo electrónico",
                password_input_placeholder: "Tu contraseña",
                button_label: "Registrarse",
                loading_button_label: "Registrando...",
                social_provider_text: "Registrarse con {{provider}}",
                link_text: "¿No tienes una cuenta? Regístrate",
                confirmation_text: "Revisa tu correo electrónico para confirmar tu cuenta"
              },
              sign_in: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                email_input_placeholder: "Tu correo electrónico",
                password_input_placeholder: "Tu contraseña",
                button_label: "Iniciar sesión",
                loading_button_label: "Iniciando sesión...",
                social_provider_text: "Iniciar sesión con {{provider}}",
                link_text: "¿No tienes una cuenta? Regístrate"
              },
              forgotten_password: {
                email_label: "Correo electrónico",
                password_label: "Contraseña",
                email_input_placeholder: "Tu correo electrónico",
                button_label: "Enviar instrucciones",
                loading_button_label: "Enviando instrucciones...",
                link_text: "¿Olvidaste tu contraseña?",
                confirmation_text: "Revisa tu correo electrónico para restablecer tu contraseña"
              },
              update_password: {
                password_label: "Nueva contraseña",
                password_input_placeholder: "Tu nueva contraseña",
                button_label: "Actualizar contraseña",
                loading_button_label: "Actualizando contraseña...",
                confirmation_text: "Tu contraseña ha sido actualizada"
              },
              magic_link: {
                email_input_placeholder: "Tu correo electrónico",
                button_label: "Enviar enlace mágico",
                loading_button_label: "Enviando enlace...",
                link_text: "Enviar enlace mágico",
                confirmation_text: "Revisa tu correo electrónico para iniciar sesión"
              },
              verify_otp: {
                email_input_placeholder: "Tu correo electrónico",
                phone_input_placeholder: "Tu número de teléfono",
                token_input_placeholder: "Introduce el código",
                button_label: "Verificar",
                loading_button_label: "Verificando..."
              }
            }
          }}
        />
      </Card>
    </div>
  );
};

export default AuthPage;
