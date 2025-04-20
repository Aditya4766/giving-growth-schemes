
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityData {
  id: string;
  date: string;
  amount: number;
  userName: string;
  schemeTitle: string;
}

interface RecentActivityTableProps {
  data: ActivityData[];
}

export function RecentActivityTable({ data }: RecentActivityTableProps) {
  return (
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
            {data.map(donation => (
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
  );
}
