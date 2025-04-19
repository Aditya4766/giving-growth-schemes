
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold text-purple mb-4">GivingGrowth</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Empowering communities through collaborative fundraising and transparent giving.
              Join us in making a difference, one donation at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-600 hover:text-purple transition-colors">
                  All Schemes
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GivingGrowth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
