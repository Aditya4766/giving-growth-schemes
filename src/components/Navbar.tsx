
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold text-purple">GivingGrowth</Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple transition-colors">
              Home
            </Link>
            <Link to="/schemes" className="text-gray-700 hover:text-purple transition-colors">
              All Schemes
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple transition-colors">
                  Dashboard
                </Link>
                
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-purple transition-colors">
                    Admin
                  </Link>
                )}
                
                <div className="flex items-center ml-4">
                  <span className="text-sm text-gray-600 mr-2">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
