
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { schemes, loadFromLocalStorage } from '../data/schemes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Donation } from '../types';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userDonations, setUserDonations] = useState<Donation[]>([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }
    
    // Load data from local storage
    loadFromLocalStorage();
    
    // Set user's donations after loading from local storage
    if (user) {
      setUserDonations([...user.donations]);
    }
  }, [isAuthenticated, navigate, user]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Calculate user's donation statistics
  const totalDonated = userDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const schemesSupported = new Set(userDonations.map(donation => donation.schemeId)).size;
  const latestDonations = [...userDonations]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Get scheme details for each donation
  const getSchemeTitle = (schemeId: string) => {
    const scheme = schemes.find(s => s.id === schemeId);
    return scheme ? scheme.title : 'Unknown Scheme';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Donated</CardDescription>
                <CardTitle className="text-3xl">${totalDonated}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Donations Made</CardDescription>
                <CardTitle className="text-3xl">{user.donations.length}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Schemes Supported</CardDescription>
                <CardTitle className="text-3xl">{schemesSupported}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="donations">Your Donations</TabsTrigger>
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>
                    View all your donations and their details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.donations.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Scheme</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {latestDonations.map(donation => (
                          <TableRow key={donation.id}>
                            <TableCell>
                              {new Date(donation.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{getSchemeTitle(donation.schemeId)}</TableCell>
                            <TableCell>${donation.amount}</TableCell>
                            <TableCell>
                              <Link to={`/scheme/${donation.schemeId}`}>
                                <Button variant="outline" size="sm">
                                  View Scheme
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
                      <Link to="/schemes">
                        <Button>Browse Schemes</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    
                    <div>
                      <Label>Email</Label>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    
                    <Button variant="outline">Edit Profile</Button>
                  </div>
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

// Import Label component
import { Label } from '@/components/ui/label';

export default Dashboard;
