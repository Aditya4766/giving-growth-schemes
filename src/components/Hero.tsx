
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-light to-white">
      <div className="container-custom flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Support Causes That <span className="text-purple">Make a Difference</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Join our community of givers and help fund projects that create positive change.
            Every donation, no matter the size, brings us closer to a better world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/schemes">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Schemes
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80" 
              alt="People collaborating" 
              className="w-full"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-soft rounded-full z-0 animate-pulse-soft" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-soft rounded-full z-0 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
