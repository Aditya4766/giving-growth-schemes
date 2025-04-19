
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state, default to home page
  const from = location.state?.from || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      // Successful login
      toast.success("Login successful", {
        description: "Welcome back to GivingGrowth!"
      });
      
      // Redirect to the page they were trying to access, or home page
      navigate(from);
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "Invalid email or password"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Demo login function
  const handleDemoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await login('jane@example.com', 'password123');
      
      toast.success("Demo login successful", {
        description: "You are now logged in as Jane Smith"
      });
      
      navigate(from);
    } catch (error) {
      toast.error("Demo login failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-purple hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDemoLogin}
                  disabled={isSubmitting}
                >
                  Demo Login (Jane Smith)
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-purple hover:underline">
                  Create Account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
