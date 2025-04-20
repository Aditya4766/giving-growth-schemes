
import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SchemeCard = ({ scheme, featured = false }) => {
  const endDate = new Date(scheme.endDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg",
      featured ? "h-full" : ""
    )}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={scheme.imageUrl} 
          alt={scheme.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-purple text-white text-xs font-medium px-2 py-1 rounded-full">
          {scheme.category}
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">{scheme.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{scheme.description}</p>
        
        <ProgressBar 
          current={scheme.currentAmount} 
          target={scheme.targetAmount} 
          className="mb-4"
        />
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Link to={`/scheme/${scheme.id}`} className="w-full">
          <Button className="w-full" variant={featured ? "default" : "outline"}>
            {featured ? 'Donate Now' : 'View Details'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
