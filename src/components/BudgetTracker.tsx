import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Car, Utensils, Gamepad2, Heart, Plus } from "lucide-react";
import { useBudgets } from "@/hooks/useBudgets";
import { EditBudgetDialog } from "@/components/EditBudgetDialog";

interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  budget: number;
  icon: React.ReactNode;
  color: string;
}

const defaultCategories: BudgetCategory[] = [
  {
    id: "housing",
    name: "Housing",
    spent: 0,
    budget: 0,
    icon: <Home className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  {
    id: "food",
    name: "Food & Dining",
    spent: 0,
    budget: 0,
    icon: <Utensils className="w-5 h-5" />,
    color: "bg-green-500",
  },
  {
    id: "transportation",
    name: "Transportation",
    spent: 0,
    budget: 0,
    icon: <Car className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  {
    id: "shopping",
    name: "Shopping",
    spent: 0,
    budget: 0,
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "bg-purple-500",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    spent: 0,
    budget: 0,
    icon: <Gamepad2 className="w-5 h-5" />,
    color: "bg-pink-500",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    spent: 0,
    budget: 0,
    icon: <Heart className="w-5 h-5" />,
    color: "bg-red-500",
  },
];

export const BudgetTracker = () => {
  const { budgets, loading, updateBudget } = useBudgets();

  const categories = defaultCategories.map(defaultCat => {
    const budget = budgets.find(b => b.category.toLowerCase() === defaultCat.id);
    return {
      ...defaultCat,
      spent: budget?.spent_amount || 0,
      budget: budget?.allocated_amount || 0,
    };
  });

  if (loading) {
    return (
      <Card className="bg-gradient-card border-border/50 shadow-financial">
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const remainingBudget = totalBudget - totalSpent;

  const getStatusColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return "destructive";
    if (percentage >= 80) return "destructive";
    if (percentage >= 60) return "default";
    return "secondary";
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">
          Monthly Budget Tracker
        </CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">
              ${totalSpent.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              ${remainingBudget.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              ${totalBudget.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Budget</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => {
          const percentage = Math.min((category.spent / category.budget) * 100, 100);
          const remaining = Math.max(category.budget - category.spent, 0);
          
          return (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      ${remaining.toLocaleString()} remaining
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      ${category.spent.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of ${category.budget.toLocaleString()}
                    </p>
                  </div>
                  <EditBudgetDialog
                    category={category.id}
                    currentBudget={category.budget}
                    currentSpent={category.spent}
                    onUpdate={(allocated, spent) => updateBudget(category.id, allocated, spent)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <Progress value={percentage} className="h-2" />
                </div>
                <Badge variant={getStatusColor(category.spent, category.budget)}>
                  {Math.round(percentage)}%
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};