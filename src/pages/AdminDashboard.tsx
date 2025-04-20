import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { schemes, users, donations, loadFromLocalStorage } from '../data/schemes';
import { CreateSchemeDialog } from '../components/CreateSchemeDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCards } from '@/components/admin/StatsCards';
import { SchemePerformanceTable } from '@/components/admin/SchemePerformanceTable';
import { DonorsTable } from '@/components/admin/DonorsTable';
import { RecentActivityTable } from '@/components/admin/RecentActivityTable';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/admin' } });
      return;
    }
    
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    
    loadFromLocalStorage();
  }, [isAuthenticated, isAdmin, navigate]);
  
  const handleSchemeCreated = (newScheme) => {
    schemes.push(newScheme);
    saveToLocalStorage();
  };
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalUsers = users.length;
  const totalDonations = donations.length;
  
  const schemePerformance = schemes.map(scheme => {
    const schemeDonations = donations.filter(d => d.schemeId === scheme.id);
    const totalRaised = schemeDonations.reduce((sum, d) => sum + d.amount, 0);
    const donorCount = new Set(schemeDonations.map(d => d.userId)).size;
    
    return {
      id: scheme.id,
      title: scheme.title,
      totalRaised,
      donorCount,
      progress: (scheme.currentAmount / scheme.targetAmount) * 100,
    };
  }).sort((a, b) => b.totalRaised - a.totalRaised);
  
  const donorPerformance = users.map(user => {
    const userDonations = donations.filter(d => d.userId === user.id);
    const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);
    const donationCount = userDonations.length;
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      totalDonated,
      donationCount,
    };
  }).sort((a, b) => b.totalDonated - a.totalDonated);
  
  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
    .map(donation => {
      const user = users.find(u => u.id === donation.userId);
      const scheme = schemes.find(s => s.id === donation.schemeId);
      
      return {
        id: donation.id,
        date: donation.date,
        amount: donation.amount,
        userName: user ? user.name : 'Unknown User',
        schemeTitle: scheme ? scheme.title : 'Unknown Scheme',
      };
    });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <CreateSchemeDialog onSchemeCreated={handleSchemeCreated} />
          </div>
          
          <StatsCards
            totalRaised={totalRaised}
            totalUsers={totalUsers}
            totalDonations={totalDonations}
          />
          
          <Tabs defaultValue="schemes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="schemes">Scheme Performance</TabsTrigger>
              <TabsTrigger value="donors">Top Donors</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schemes">
              <SchemePerformanceTable data={schemePerformance} />
            </TabsContent>
            
            <TabsContent value="donors">
              <DonorsTable data={donorPerformance} />
            </TabsContent>
            
            <TabsContent value="recent">
              <RecentActivityTable data={recentDonations} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
