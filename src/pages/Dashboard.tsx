import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Import from the correct path
import { Donation } from "@/data/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Mock data for donations (replace with actual data fetching)
    const mockDonations: Donation[] = [
      {
        id: "1",
        userId: "1",
        schemeId: "1",
        amount: 100,
        date: "2023-01-01",
        message: "Great cause!",
      },
      {
        id: "2",
        userId: "1",
        schemeId: "2",
        amount: 50,
        date: "2023-02-15",
        message: "Supporting education.",
      },
    ];
    setDonations(mockDonations);

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
          <CardDescription>
            Welcome, {user.name}! Here's an overview of your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultvalue="donations" className="w-full">
            <TabsList>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="donations">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Scheme ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.id}</TableCell>
                      <TableCell>{donation.schemeId}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.message || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="account">
              <div>
                <p>Email: {user.email}</p>
                <Button onClick={handleLogout} className="mt-4">
                  Logout
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
