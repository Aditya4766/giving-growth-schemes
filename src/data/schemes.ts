import { Scheme, User, Donation } from "./types";

// Mock schemes data
export const schemes: Scheme[] = [
  {
    id: "1",
    title: "Clean Water Initiative",
    description: "Help us provide clean drinking water to communities in need. This initiative aims to install water purification systems in 50 villages, affecting over 10,000 lives positively.",
    targetAmount: 50000,
    currentAmount: 28500,
    category: "Environment",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    endDate: "2025-08-30",
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Education for All",
    description: "Support our mission to provide quality education to underprivileged children. Your donations will help fund school supplies, scholarships, and teacher training programs.",
    targetAmount: 75000,
    currentAmount: 42000,
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    endDate: "2025-07-25",
    createdAt: "2025-02-10",
  },
  {
    id: "3",
    title: "Digital Literacy Program",
    description: "Bridge the digital divide by helping us provide computers and internet access to rural communities. This program also includes training in basic digital skills.",
    targetAmount: 60000,
    currentAmount: 15000,
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    endDate: "2025-09-15",
    createdAt: "2025-03-05",
  },
  {
    id: "4",
    title: "Women Empowerment Project",
    description: "Help women develop skills for financial independence through vocational training and micro-loans for small businesses.",
    targetAmount: 40000,
    currentAmount: 22000,
    category: "Social",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    endDate: "2025-06-30",
    createdAt: "2025-01-25",
  },
];

// Mock users
export const users: User[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    donations: [],
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    donations: [],
  },
];

// Mock donations
export const donations: Donation[] = [
  {
    id: "1",
    userId: "1",
    schemeId: "1",
    amount: 150,
    date: "2025-03-15",
    message: "Happy to support this important cause!",
  },
  {
    id: "2",
    userId: "1",
    schemeId: "2",
    amount: 75,
    date: "2025-03-20",
  },
];

// Add donations to users
users[0].donations = donations.filter(donation => donation.userId === "1");

// Function to update scheme amounts based on donations
export const updateSchemeAmounts = () => {
  schemes.forEach(scheme => {
    const schemeDonations = donations.filter(d => d.schemeId === scheme.id);
    scheme.currentAmount = schemeDonations.reduce((total, d) => total + d.amount, scheme.currentAmount);
  });
};

// Helper functions for local storage persistence
export const saveToLocalStorage = () => {
  localStorage.setItem('schemes', JSON.stringify(schemes));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('donations', JSON.stringify(donations));
};

export const loadFromLocalStorage = () => {
  const savedSchemes = localStorage.getItem('schemes');
  const savedUsers = localStorage.getItem('users');
  const savedDonations = localStorage.getItem('donations');
  
  if (savedSchemes) schemes.splice(0, schemes.length, ...JSON.parse(savedSchemes));
  if (savedUsers) users.splice(0, users.length, ...JSON.parse(savedUsers));
  if (savedDonations) donations.splice(0, donations.length, ...JSON.parse(savedDonations));
  
  // Update user donations
  users.forEach(user => {
    user.donations = donations.filter(donation => donation.userId === user.id);
  });
};

// Function to add a new donation
export const addDonation = (donation: Donation) => {
  donations.push(donation);
  
  // Update user donations
  const user = users.find(u => u.id === donation.userId);
  if (user) {
    user.donations.push(donation);
  }
  
  // Update scheme amount
  const scheme = schemes.find(s => s.id === donation.schemeId);
  if (scheme) {
    scheme.currentAmount += donation.amount;
  }
  
  saveToLocalStorage();
  return donation;
};

// Function to register a new user
export const registerUser = (name: string, email: string, password: string): User => {
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
    password,
    donations: [],
  };
  
  users.push(newUser);
  saveToLocalStorage();
  return newUser;
};

// Function to login a user
export const loginUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

// Function to get highest donation for a scheme
export const getHighestDonation = (schemeId: string): Donation | null => {
  const schemeDonations = donations.filter(d => d.schemeId === schemeId);
  if (schemeDonations.length === 0) return null;
  
  return schemeDonations.reduce((highest, current) => 
    current.amount > highest.amount ? current : highest, schemeDonations[0]);
};

// Initialize local storage on first load
if (typeof window !== 'undefined' && !localStorage.getItem('initialized')) {
  saveToLocalStorage();
  localStorage.setItem('initialized', 'true');
} else if (typeof window !== 'undefined') {
  loadFromLocalStorage();
}
