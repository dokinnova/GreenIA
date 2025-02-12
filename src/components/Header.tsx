
import React from 'react';
import { UserRound, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const Header = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex gap-2">
      {session && (
        <Button
          className="flex items-center gap-2 bg-white text-primary hover:bg-gray-100"
          onClick={() => navigate('/dashboard')}
        >
          <LayoutDashboard className="h-4 w-4" />
          Panel de Control
        </Button>
      )}
      <Button
        className="flex items-center gap-2 bg-white text-primary hover:bg-gray-100"
        onClick={() => navigate(session ? '/profile' : '/auth')}
      >
        <UserRound className="h-4 w-4" />
        {session ? 'Tu perfil' : 'Acceder'}
      </Button>
    </div>
  );
};

export default Header;
