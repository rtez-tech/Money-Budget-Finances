import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Target, TrendingDown } from "lucide-react";
import { useDebts } from "@/hooks/useDebts";
import { EditDebtDialog } from "@/components/EditDebtDialog";
import { AddDebtDialog } from "@/components/AddDebtDialog";

export const DebtTracker = () => {
  const { debts, loading, addDebt, updateDebt, deleteDebt } = useDebts();

  if (loading) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-financial">
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minimum_payment, 0);
  
  // For progress calculation, we need to estimate original amounts
  // Since we don't have original amounts in the database, we'll use balance * 1.5 as an estimate
  const estimatedOriginalTotal = debts.reduce((sum, debt) => sum + (debt.balance * 1.5), 0);
  const estimatedPaidOff = estimatedOriginalTotal - totalDebt;
  const progressPercentage = estimatedOriginalTotal > 0 ? (estimatedPaidOff / estimatedOriginalTotal) * 100 : 0;

  const getInterestRateColor = (rate: number) => {
    if (rate >= 20) return 'destructive';
    if (rate >= 10) return 'default';
    return 'secondary';
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Target className="w-6 h-6 text-primary" />
            <span>Debt Elimination Tracker</span>
          </CardTitle>
          <AddDebtDialog onAdd={addDebt} />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">
              ${totalDebt.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Debt</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              ${estimatedPaidOff.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Est. Paid Off</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              ${totalMinPayments.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Min Payments</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {Math.round(progressPercentage)}%
            </p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <TrendingDown className="w-4 h-4 text-success" />
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {debts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No debts added yet. Start by adding your first debt to track your progress.</p>
            <AddDebtDialog onAdd={addDebt} />
          </div>
        ) : (
          debts.map((debt) => {
            // Estimate original amount as balance * 1.5 for progress calculation
            const estimatedOriginal = debt.balance * 1.5;
            const estimatedPaidOff = estimatedOriginal - debt.balance;
            const debtProgress = (estimatedPaidOff / estimatedOriginal) * 100;
            
            return (
              <div key={debt.id} className="p-4 border border-border/50 rounded-lg bg-card">
                <div className="items-center justify-between space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {debt.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getInterestRateColor(debt.interest_rate)}>
                            {debt.interest_rate}% APR
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Min: ${debt.minimum_payment}/mo
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-lg font-bold text-destructive">
                          ${debt.balance.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          current balance
                        </p>
                      </div>
                      <EditDebtDialog
                        debt={debt}
                        onUpdate={updateDebt}
                        onDelete={deleteDebt}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Est. ${estimatedPaidOff.toLocaleString()} paid off
                      </span>
                      <span className="text-sm font-medium text-success">
                        {Math.round(debtProgress)}% progress
                      </span>
                    </div>
                    <Progress value={debtProgress} className="h-2" />
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-primary">Debt Avalanche Strategy</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Pay minimums on all debts, then put extra money toward the highest interest rate debt first. 
            This saves you the most money on interest.
          </p>
          <div className="flex space-x-2">
            <Button variant="default" size="sm">
              Calculate Payoff Plan
            </Button>
            <Button variant="outline" size="sm">
              Learn More Strategies
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};