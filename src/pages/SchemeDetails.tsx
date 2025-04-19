
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonationForm from '../components/DonationForm';
import ProgressBar from '../components/ProgressBar';
import { schemes, donations, loadFromLocalStorage, getHighestDonation } from '../data/schemes';
import { Scheme, Donation } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { users } from '../data/schemes';

const SchemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [schemeDonations, setSchemeDonations] = useState<Donation[]>([]);
  const [highestDonation, setHighestDonation] = useState<Donation | null>(null);
  
  useEffect(() => {
    // Load data from local storage
    loadFromLocalStorage();
    
    // Find the scheme by ID
    const foundScheme = schemes.find(s => s.id === id);
    if (!foundScheme) {
      navigate('/schemes');
      return;
    }
    
    setScheme(foundScheme);
    
    // Get donations for this scheme
    const schemeSpecificDonations = donations.filter(d => d.schemeId === id);
    setSchemeDonations(schemeSpecificDonations);
    
    // Get highest donation
    const highest = getHighestDonation(id!);
    setHighestDonation(highest);
    
    setLoading(false);
  }, [id, navigate]);
  
  // Find donor names for display
  const getDonorName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Anonymous';
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!scheme) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Scheme not found</h2>
            <p className="text-gray-600 mb-4">The scheme you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/schemes')}>
              View All Schemes
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Calculate days remaining
  const endDate = new Date(scheme.endDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Banner Image */}
        <div className="w-full h-64 md:h-96 relative">
          <img 
            src={scheme.imageUrl} 
            alt={scheme.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="container-custom pb-8">
              <span className="inline-block bg-purple text-white text-sm font-medium px-3 py-1 rounded-full mb-2">
                {scheme.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {scheme.title}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Scheme Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">About This Fundraiser</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">
                  {scheme.description}
                </p>
                
                <ProgressBar 
                  current={scheme.currentAmount} 
                  target={scheme.targetAmount}
                  className="mb-6"
                />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Raised</p>
                    <p className="text-xl font-semibold text-gray-900">
                      ${scheme.currentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Goal</p>
                    <p className="text-xl font-semibold text-gray-900">
                      ${scheme.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Time Left</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Ended'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Donations List */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Recent Donations</h2>
                  
                  {schemeDonations.length > 0 ? (
                    <div className="space-y-4">
                      {[...schemeDonations]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 5)
                        .map(donation => (
                          <div key={donation.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{getDonorName(donation.userId)}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(donation.date).toLocaleDateString()}
                                </p>
                                {donation.message && (
                                  <p className="text-gray-700 mt-1 italic">"{donation.message}"</p>
                                )}
                              </div>
                              <p className="text-lg font-semibold text-purple">${donation.amount}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No donations yet. Be the first to donate!
                    </p>
                  )}
                  
                  {/* Highest Donation Highlight */}
                  {highestDonation && (
                    <div className="mt-6 bg-purple-light p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Highest Donation</h3>
                      <div className="flex justify-between items-center">
                        <p>{getDonorName(highestDonation.userId)}</p>
                        <p className="font-semibold">${highestDonation.amount}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Donation Form */}
            <div>
              <div className="sticky top-6">
                <DonationForm scheme={scheme} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchemeDetails;
