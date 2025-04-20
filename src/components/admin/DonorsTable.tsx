
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DonorData {
  id: string;
  name: string;
  email: string;
  totalDonated: number;
  donationCount: number;
}

interface DonorsTableProps {
  data: DonorData[];
}

export function DonorsTable({ data }: DonorsTableProps) {
  return (
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
            {data.map(donor => (
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
  );
}
