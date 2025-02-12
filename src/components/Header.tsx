
import React from 'react';
import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const Header = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => navigate(session ? '/dashboard' : '/auth')}
      >
        <UserRound className="h-4 w-4" />
        {session ? 'Tu cuenta' : 'Acceder'}
      </Button>
    </div>
  );
};

export default Header;
