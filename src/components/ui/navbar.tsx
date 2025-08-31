import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  MessageCircle, 
  Trophy, 
  Gift, 
  FileText, 
  User, 
  Menu, 
  X,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  userRole?: 'student' | 'academic' | 'guest' | null;
  walletBalance?: number;
  onAuthClick: () => void;
}

const Navbar = ({ userRole, walletBalance, onAuthClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: null },
    { label: "Experience Library", href: "/experiences", icon: BookOpen },
    { label: "Q&A", href: "/qna", icon: MessageCircle },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Rewards", href: "/rewards", icon: Gift },
    { label: "Resources", href: "/resources", icon: FileText },
  ];

  const getNavItems = () => {
    if (userRole === 'guest') {
      return navItems.slice(0, 4); // Limited access for guests
    }
    return navItems;
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-lg font-bold text-white">X</span>
            </div>
            <span className="text-xl font-bold text-gradient-primary">XShare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {getNavItems().map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - Wallet & Auth */}
          <div className="flex items-center space-x-4">
            {/* Wallet for Students */}
            {userRole === 'student' && walletBalance !== undefined && (
              <div className="hidden sm:flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-primary text-white text-sm font-medium">
                <Coins className="h-4 w-4 coin-pulse" />
                <span>{walletBalance}</span>
              </div>
            )}

            {/* Auth Buttons */}
            {!userRole ? (
              <Button onClick={onAuthClick} className="btn-gradient">
                Sign In
              </Button>
            ) : userRole === 'guest' ? (
              <Button onClick={onAuthClick} variant="outline">
                Sign Up to Contribute
              </Button>
            ) : (
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-card-border">
            <div className="flex flex-col space-y-3">
              {getNavItems().map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Wallet */}
              {userRole === 'student' && walletBalance !== undefined && (
                <div className="flex items-center space-x-2 py-2">
                  <Coins className="h-4 w-4 coin-pulse" />
                  <span className="text-sm font-medium">{walletBalance} Coins</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;