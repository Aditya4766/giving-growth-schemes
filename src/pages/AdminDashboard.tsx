import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { schemes, users, donations, loadFromLocalStorage, saveToLocalStorage } from '../data/schemes';
import { CreateSchemeDialog } from '../components/CreateSchemeDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Raised</CardDescription>
                <CardTitle className="text-3xl">${totalRaised}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-3xl">{totalUsers}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Donations</CardDescription>
                <CardTitle className="text-3xl">{totalDonations}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="schemes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="schemes">Scheme Performance</TabsTrigger>
              <TabsTrigger value="donors">Top Donors</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schemes">
              <Card>
                <CardHeader>
                  <CardTitle>Scheme Performance</CardTitle>
                  <CardDescription>
                    Overview of all fundraising schemes and their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Amount Raised</TableHead>
                        <TableHead>Donors</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schemePerformance.map(scheme => (
                        <TableRow key={scheme.id}>
                          <TableCell className="font-medium">{scheme.title}</TableCell>
                          <TableCell>${scheme.totalRaised}</TableCell>
                          <TableCell>{scheme.donorCount}</TableCell>
                          <TableCell>{scheme.progress.toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donors">
              <Card>
                <CardHeader>
                  <CardTitle>Top Donors</CardTitle>
                  <CardDescription>
                    List of users who have made the most contributions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Donated</TableHead>
                        <TableHead># Donations</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donorPerformance.map(donor => (
                        <TableRow key={donor.id}>
                          <TableCell className="font-medium">{donor.name}</TableCell>
                          <TableCell>{donor.email}</TableCell>
                          <TableCell>${donor.totalDonated}</TableCell>
                          <TableCell>{donor.donationCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>
                    Most recent donation activity on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Donor</TableHead>
                        <TableHead>Scheme</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDonations.map(donation => (
                        <TableRow key={donation.id}>
                          <TableCell>
                            {new Date(donation.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{donation.userName}</TableCell>
                          <TableCell>{donation.schemeTitle}</TableCell>
                          <TableCell>${donation.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
