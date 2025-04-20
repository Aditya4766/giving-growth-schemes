
declare module "@/data/types" {
  export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    donations: Donation[];
  }
  
  export interface Scheme {
    id: string;
    title: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    category: string;
    imageUrl: string;
    endDate: string;
    createdAt: string;
  }
  
  export interface Donation {
    id: string;
    userId: string;
    schemeId: string;
    amount: number;
    date: string;
    message?: string;
  }
}
