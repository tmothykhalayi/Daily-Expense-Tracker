// Interface for users
export interface TUser {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    hashedRefreshToken?: string | null;
    createdAt: string;
    updatedAt: string;
}

// Interface for budget
export interface TBudget {
  userId: number;
  categoryId?: number;
  amount: number;
  startDate: string;
  endDate: string;
}

// Interface for expense
export interface TExpense {
  amount: number;
  description?: string;
  date: string;
  categoryId: number;
}

// Interface for categories
export interface TCategory {
    id: number;
    name: string;
    userId: number;
    created_at: string;
}

// Interface for reports
export interface TReports {
  user_id: number;
  start_date: string;
  end_date: string;
}
