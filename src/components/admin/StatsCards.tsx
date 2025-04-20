
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalRaised: number;
  totalUsers: number;
  totalDonations: number;
}

export function StatsCards({ totalRaised, totalUsers, totalDonations }: StatsCardsProps) {
  return (
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
  );
}
