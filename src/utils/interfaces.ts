export interface AuthState {
  registerUser: (body: FormProps) => Promise<void>;
  loginUser: (body: FormProps) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  isTokenValid: () => boolean;
}

export interface FormProps {
  email: string;
  password: string;
}

export interface TransactionProps {
  id: number;
  description: string;
  amount: number;
  category: string;
  type: string;
  date: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ValuesSubmitProps {
  description: string;
  amount: number;
  category: string;
  type: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface StoreState {
  user: User | null;
  getTransactions: (userId: number) => Promise<TransactionProps[]>;
  fetchUserFromToken: () => void;
  createTransaction: (
    userId: number,
    transactionData: any
  ) => Promise<Transaction>;
  deleteTransaction: (userId: number) => Promise<void>;
  editTransaction: (transactionData: any) => Promise<Transaction>;
}

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
}
