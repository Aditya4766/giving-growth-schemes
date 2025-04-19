
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scheme } from '../types';
import { useAuth } from '../context/AuthContext';
import { addDonation, loadFromLocalStorage } from '../data/schemes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface DonationFormProps {
  scheme: Scheme;
}

const DonationForm = ({ scheme }: DonationFormProps) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handlePresetAmount = (value: number) => {
    setAmount(value.toString());
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to make a donation", {
        description: "You'll be redirected to the login page."
      });
      navigate('/login', { state: { from: `/scheme/${scheme.id}` } });
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add the donation
      addDonation({
        id: Date.now().toString(),
        userId: user!.id,
        schemeId: scheme.id,
        amount: Number(amount),
        date: new Date().toISOString(),
        message: message.trim() || undefined,
      });
      
      // Make sure to reload the latest data from local storage
      loadFromLocalStorage();
      
      // Update the user in localStorage to reflect the new donation
      if (user) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        // Reload the user's donations from the updated users array
        const updatedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUser = updatedUsers.find((u: any) => u.id === user.id);
        
        if (updatedUser && currentUser) {
          currentUser.donations = updatedUser.donations;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      }
      
      // Success message and reset form
      toast.success("Thank you for your donation!", {
        description: `$${amount} has been successfully donated to ${scheme.title}.`
      });
      setAmount('');
      setMessage('');
      
      // Navigate to dashboard to see updated donation history
      navigate('/dashboard');
    } catch (error) {
      toast.error("Failed to process donation", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Make a Donation</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="amount" className="mb-2 block">
              Donation Amount ($)
            </Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mb-2"
              required
            />
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[10, 25, 50, 100, 250, 500].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  onClick={() => handlePresetAmount(value)}
                  className={amount === value.toString() ? 'bg-purple/10' : ''}
                >
                  ${value}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="message" className="mb-2 block">
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message of support..."
              rows={3}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Donate Now'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col text-center text-sm text-gray-500">
        <p>All donations are secure and encrypted</p>
        <p>GivingGrowth never stores your payment details</p>
      </CardFooter>
    </Card>
  );
};

export default DonationForm;
