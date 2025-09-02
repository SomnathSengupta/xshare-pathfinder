import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Wallet, LogOut, Bell, X, Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavbarProps {
  userRole?: 'student' | 'academic' | 'guest' | null;
  walletBalance?: number;
  onAuthClick: () => void;
}

const Navbar = ({ userRole, walletBalance, onAuthClick }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Experiences", href: "/experiences" },
    { name: "Q&A", href: "/qa" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Rewards", href: "/rewards" },
    { name: "Resources", href: "/resources" },
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
                key={item.name}
                to={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <span>{item.name}</span>
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

          {userRole && (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>

              {/* Wallet Balance for students */}
              {userRole === 'student' && (
                <div className="hidden md:flex items-center space-x-2 bg-card px-3 py-2 rounded-lg border">
                  <Wallet className="h-4 w-4 coin-pulse" />
                  <span className="font-semibold">{walletBalance}</span>
                  <span className="text-xs text-muted-foreground">coins</span>
                </div>
              )}

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  {userRole === 'student' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/student-dashboard" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <div className="flex items-center">
                          <Wallet className="mr-2 h-4 w-4" />
                          Wallet: {walletBalance} coins
                        </div>
                      </DropdownMenuItem>
                    </>
                  )}

                  {userRole === 'academic' && (
                    <DropdownMenuItem asChild>
                      <Link to="/academic-dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Academic Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

            {!userRole ? (
              <Button onClick={onAuthClick} className="btn-gradient">
                Sign In
              </Button>
            ) : userRole === 'guest' ? (
              <Button onClick={onAuthClick} variant="outline">
                Sign Up to Contribute
              </Button>
            ) : null}

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
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{item.name}</span>
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