import { useState, useEffect } from "react";
import { useBudgets } from "@/hooks/useBudgets";
import { useDebts } from "@/hooks/useDebts";

export const useFinancialData = () => {
  const { budgets } = useBudgets();
  const { debts } = useDebts();

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.allocated_amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent_amount, 0);
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  
  // Emergency fund - let's assume target is 3 months of expenses (budget)
  const emergencyFundTarget = totalBudget * 3;
  const emergencyFundCurrent = Math.max(0, totalBudget - totalSpent) * 2; // Simplified calculation
  
  // Debt payoff - estimate original debt as current balance * 1.5
  const estimatedOriginalDebt = debts.reduce((sum, debt) => sum + (debt.balance * 1.5), 0);
  const debtPaidOff = estimatedOriginalDebt - totalDebt;
  
  // Financial score - simplified calculation based on budget adherence and debt ratio
  const budgetScore = totalBudget > 0 ? Math.max(0, 100 - ((totalSpent / totalBudget) * 100)) : 0;
  const debtScore = estimatedOriginalDebt > 0 ? (debtPaidOff / estimatedOriginalDebt) * 100 : 100;
  const financialScore = Math.round((budgetScore + debtScore) / 2);

  return {
    monthlyBudget: {
      current: totalSpent,
      target: totalBudget,
    },
    emergencyFund: {
      current: emergencyFundCurrent,
      target: emergencyFundTarget,
    },
    debtPayoff: {
      current: debtPaidOff,
      target: estimatedOriginalDebt,
    },
    financialScore: {
      current: financialScore,
      target: 100,
    },
  };
};