import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { schemes, getHighestDonation } from "../data/schemes";
import DonationForm from "../components/DonationForm";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Donation } from "@/data/types";

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [highestDonation, setHighestDonation] = useState(null);

  useEffect(() => {
    const foundScheme = schemes.find((s) => s.id === id);
    if (!foundScheme) {
      navigate("/schemes");
      return;
    }
    
    setScheme(foundScheme);
    
    // Get highest donation for this scheme
    const highest = getHighestDonation(id);
    setHighestDonation(highest);
  }, [id, navigate]);

  if (!scheme) return null;

  const handleDonationSuccess = () => {
    setShowDonationForm(false);
    // Refresh highest donation
    const highest = getHighestDonation(id);
    setHighestDonation(highest);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const daysRemaining = () => {
    const endDate = new Date(scheme.endDate).getTime();
    const today = new Date().getTime();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/schemes")}
        className="mb-4"
      >
        ← Back to Schemes
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{scheme.title}</CardTitle>
              <CardDescription>
                Created on {formatDate(scheme.createdAt)} • {scheme.category}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img 
                  src={scheme.imageUrl} 
                  alt={scheme.title} 
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">{scheme.description}</p>
                
                <div className="mt-6">
                  <ProgressBar 
                    current={scheme.currentAmount} 
                    target={scheme.targetAmount} 
                  />
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mt-4">
                  <div>
                    <span className="font-medium">End Date:</span> {formatDate(scheme.endDate)}
                  </div>
                  <div>
                    <span className="font-medium">{daysRemaining()}</span> days remaining
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => setShowDonationForm(true)} 
                className="w-full"
                disabled={showDonationForm}
              >
                Donate Now
              </Button>
            </CardFooter>
          </Card>
          
          {showDonationForm && (
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Donation</CardTitle>
                  <CardDescription>
                    Support this cause with your contribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DonationForm 
                    schemeId={scheme.id} 
                    onSuccess={handleDonationSuccess}
                    onCancel={() => setShowDonationForm(false)}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Scheme Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Target Amount</h3>
                  <p className="text-lg font-semibold">${scheme.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Amount</h3>
                  <p className="text-lg font-semibold">${scheme.currentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="text-lg font-semibold">{scheme.category}</p>
                </div>
                
                {highestDonation && (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500">Highest Donation</h3>
                    <p className="text-lg font-semibold">${highestDonation.amount.toLocaleString()}</p>
                    {highestDonation.message && (
                      <p className="text-sm italic mt-1">"{highestDonation.message}"</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {!user && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <p className="text-center text-gray-600 mb-4">
                  Sign in to track your donations and support more causes
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
