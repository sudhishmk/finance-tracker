export type Preferences = {
    currency: string;
    monthlyIncome: number;
    allocation: Record<string, number>;
    fireEnabled: boolean;
    fireTargetCorpus?: number;
  };
  