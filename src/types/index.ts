
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed and not stored directly
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

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
