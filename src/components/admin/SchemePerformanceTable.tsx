
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchemePerformanceData {
  id: string;
  title: string;
  totalRaised: number;
  donorCount: number;
  progress: number;
}

interface SchemePerformanceTableProps {
  data: SchemePerformanceData[];
}

export function SchemePerformanceTable({ data }: SchemePerformanceTableProps) {
  return (
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
            {data.map(scheme => (
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
  );
}
