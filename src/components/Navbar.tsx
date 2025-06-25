import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-900">
            Community App
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="small"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              !isAuthPage && (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="small">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="small">Sign Up</Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-blue-900" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {user ? (
              <div className="flex flex-col space-y-2">
                <div className="px-4 py-2 text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              !isAuthPage && (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-blue-900 hover:bg-blue-50 rounded"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-blue-900 hover:bg-blue-50 rounded"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;