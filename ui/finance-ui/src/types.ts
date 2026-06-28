export type MonthlyBudget = {
  percentage: number;
  enabled: boolean;
};

export interface Preferences {

    currency: string;

    monthlyIncome: number;

    allocation: Record<string, number>;

    categoryBudgets: Record<string, MonthlyBudget>;

    plan: FinancialPlan;

    fireEnabled: boolean;

    fireTargetCorpus?: number;

}



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

export interface CoachResponse {
  wins: string[];
  risks: string[];
  opportunities: string[];
  actions: string[];
}

export interface Allocation {

    id: string;

    name: string;

    percentage: number;

    type: "SPENDING" | "INVESTMENT";

    enabled: boolean;

}

export interface BudgetCategory {

    id: string;

    name: string;

    allocationId: string;

    percentage: number;

    enabled: boolean;

}

export interface FinancialPlan {

    version: number;

    allocations: Allocation[];

    categories: BudgetCategory[];

}

