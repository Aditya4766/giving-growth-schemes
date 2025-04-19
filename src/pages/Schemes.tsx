
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import { schemes, loadFromLocalStorage } from '../data/schemes';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const Schemes = () => {
  // Load data from local storage on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  
  // States for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('progress');
  
  // Get unique categories
  const categories = ['All', ...new Set(schemes.map(scheme => scheme.category))];
  
  // Filter and sort schemes
  const filteredSchemes = schemes.filter(scheme => {
    // Filter by search term
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = categoryFilter === '' || categoryFilter === 'All' || 
                            scheme.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort filtered schemes
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    switch (sortOption) {
      case 'progress':
        return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'ending-soon':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'amount-high':
        return b.currentAmount - a.currentAmount;
      case 'amount-low':
        return a.currentAmount - b.currentAmount;
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-12 bg-purple-light">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-center mb-4">All Fundraising Schemes</h1>
            <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
              Browse our collection of impactful fundraising initiatives and support causes
              that matter to you. Every donation makes a difference.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="mb-2 block">Category</Label>
                  <Select 
                    value={categoryFilter} 
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="sort" className="mb-2 block">Sort By</Label>
                  <Select 
                    value={sortOption} 
                    onValueChange={setSortOption}
                  >
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress">% Funded</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                      <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Schemes Grid */}
            {sortedSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sortedSchemes.map(scheme => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No schemes found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;
