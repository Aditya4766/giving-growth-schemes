
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedSchemes from '../components/FeaturedSchemes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loadFromLocalStorage } from '../data/schemes';

const Index = () => {
  // Load data from local storage on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedSchemes />
        
        {/* Impact Stats Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact Together</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Through the power of collective giving, we've achieved remarkable outcomes.
                Every donation contributes to these growing numbers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg bg-purple-light">
                <h3 className="text-4xl font-bold text-purple mb-2">4+</h3>
                <p className="text-gray-700">Active Schemes</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-green-soft">
                <h3 className="text-4xl font-bold text-purple mb-2">$107K+</h3>
                <p className="text-gray-700">Funds Raised</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-orange-soft">
                <h3 className="text-4xl font-bold text-purple mb-2">500+</h3>
                <p className="text-gray-700">Donors</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-purple-light">
                <h3 className="text-4xl font-bold text-purple mb-2">10K+</h3>
                <p className="text-gray-700">Lives Impacted</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Making a difference is simple. Follow these steps to start your giving journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up to join our community of givers and track your donations.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose a Scheme</h3>
                <p className="text-gray-600">
                  Browse our curated list of vetted fundraising schemes and pick one that resonates with you.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Make Your Donation</h3>
                <p className="text-gray-600">
                  Contribute any amount to your chosen scheme and watch the impact grow.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
