
import React from 'react';
import { Link } from 'react-router-dom';
import { schemes } from '../data/schemes';
import SchemeCard from './SchemeCard';
import { Button } from '@/components/ui/button';

const FeaturedSchemes = () => {
  // Get top 3 schemes by percentage funded
  const featuredSchemes = [...schemes]
    .sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount))
    .slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Fundraising Schemes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of donors supporting these impactful initiatives. Every contribution 
            brings us closer to achieving these important goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} featured />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/schemes">
            <Button variant="outline" size="lg">
              View All Schemes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSchemes;
