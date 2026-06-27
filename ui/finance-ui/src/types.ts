export type MonthlyBudget = {
  percentage: number;
  enabled: boolean;
};

export type Preferences = {
  currency: string;
  monthlyIncome: number;
  allocation: Record<string, number>;
  categoryBudgets: Record<string, MonthlyBudget>;
  fireEnabled: boolean;
  fireTargetCorpus?: number;
};

export type CategoryBudget = {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  utilization: number;
  status: string;
};

export type BudgetStatusResponse = {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  utilization: number;
  categories: CategoryBudget[];
};