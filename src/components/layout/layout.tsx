import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AuthModal from "@/components/auth/auth-modal";
import { useAuth } from "@/contexts/auth-context";

interface LayoutProps {
  children: ReactNode;
  userRole?: 'student' | 'academic' | 'guest' | null;
  walletBalance?: number;
}

const Layout = ({ children, userRole, walletBalance }: LayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = (role: 'student' | 'academic' | 'guest') => {
    const userData = {
      id: '1',
      email: 'user@example.com',
      firstName: 'Alex',
      lastName: 'Johnson',
      role,
      walletBalance: role === 'student' ? 1250 : undefined,
    };
    
    login(userData);
    setIsAuthModalOpen(false);
    
    if (role === 'student') {
      navigate('/student-dashboard');
    } else if (role === 'academic') {
      navigate('/academic-dashboard');
    } else {
      navigate('/experiences');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        userRole={user?.role || userRole} 
        walletBalance={user?.walletBalance || walletBalance}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuthSuccess}
      />
    </div>
  );
};

export default Layout;