import { ReactNode, useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import AuthModal from "@/components/auth/auth-modal";

interface LayoutProps {
  children: ReactNode;
  userRole?: 'student' | 'academic' | 'guest' | null;
  walletBalance?: number;
}

const Layout = ({ children, userRole = null, walletBalance = 0 }: LayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        userRole={userRole} 
        walletBalance={walletBalance}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Layout;