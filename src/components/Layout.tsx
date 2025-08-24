import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Search, BarChart3 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export const Layout = ({ children, showNavigation = true }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-bg">
      {showNavigation && (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-3xl font-bold gradient-text">GeoRankers</span>
              </Link>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {location.pathname === '/login' ? (
                  <Link to="/register">
                    <Button variant="outline" size="sm">Register</Button>
                  </Link>
                ) : location.pathname === '/register' ? (
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="default" size="sm">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};