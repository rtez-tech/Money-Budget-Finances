import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building, Car, GraduationCap, Target, TrendingDown } from "lucide-react";

interface Debt {
  id: string;
  name: string;
  balance: number;
  originalAmount: number;
  interestRate: number;
  minPayment: number;
  icon: React.ReactNode;
  type: 'credit-card' | 'loan' | 'mortgage' | 'student';
}

export const DebtTracker = () => {
  const debts: Debt[] = [
    {
      id: "credit-1",
      name: "Chase Freedom",
      balance: 3200,
      originalAmount: 5000,
      interestRate: 18.99,
      minPayment: 85,
      icon: <CreditCard className="w-5 h-5" />,
      type: 'credit-card',
    },
    {
      id: "credit-2",
      name: "Capital One",
      balance: 1800,
      originalAmount: 3000,
      interestRate: 22.49,
      minPayment: 55,
      icon: <CreditCard className="w-5 h-5" />,
      type: 'credit-card',
    },
    {
      id: "car-loan",
      name: "Auto Loan",
      balance: 12500,
      originalAmount: 18000,
      interestRate: 5.99,
      minPayment: 320,
      icon: <Car className="w-5 h-5" />,
      type: 'loan',
    },
    {
      id: "student-loan",
      name: "Student Loan",
      balance: 8500,
      originalAmount: 15000,
      interestRate: 4.5,
      minPayment: 180,
      icon: <GraduationCap className="w-5 h-5" />,
      type: 'student',
    },
  ];

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalOriginal = debts.reduce((sum, debt) => sum + debt.originalAmount, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const totalPaidOff = totalOriginal - totalDebt;
  const progressPercentage = (totalPaidOff / totalOriginal) * 100;

  const getDebtTypeColor = (type: string) => {
    switch (type) {
      case 'credit-card': return 'bg-red-500';
      case 'loan': return 'bg-blue-500';
      case 'student': return 'bg-green-500';
      case 'mortgage': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getInterestRateColor = (rate: number) => {
    if (rate >= 20) return 'destructive';
    if (rate >= 10) return 'default';
    return 'secondary';
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
          <Target className="w-6 h-6 text-primary" />
          <span>Debt Elimination Tracker</span>
        </CardTitle>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">
              ${totalDebt.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Debt</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              ${totalPaidOff.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Paid Off</p>
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
        {debts.map((debt) => {
          const paidOffAmount = debt.originalAmount - debt.balance;
          const debtProgress = (paidOffAmount / debt.originalAmount) * 100;
          
          return (
            <div key={debt.id} className="p-4 border border-border/50 rounded-lg bg-card">
              <div className="items-center justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getDebtTypeColor(debt.type)} text-white`}>
                      {debt.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {debt.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getInterestRateColor(debt.interestRate)}>
                          {debt.interestRate}% APR
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Min: ${debt.minPayment}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-destructive">
                      ${debt.balance.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of ${debt.originalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      ${paidOffAmount.toLocaleString()} paid off
                    </span>
                    <span className="text-sm font-medium text-success">
                      {Math.round(debtProgress)}% complete
                    </span>
                  </div>
                  <Progress value={debtProgress} className="h-2" />
                </div>
              </div>
            </div>
          );
        })}

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