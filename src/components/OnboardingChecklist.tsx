import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Target, PiggyBank, GraduationCap, TrendingUp, Calculator, Shield } from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export const OnboardingChecklist = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "budget",
      title: "Set Up Your Budget",
      description: "Create categories and set spending limits for each month",
      icon: <Calculator className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "emergency",
      title: "Build Emergency Fund",
      description: "Start saving for 3-6 months of living expenses",
      icon: <Shield className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "debt",
      title: "List All Debts",
      description: "Track credit cards, loans, and create payoff strategy",
      icon: <Target className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "goals",
      title: "Set Financial Goals",
      description: "Define short and long-term financial objectives",
      icon: <TrendingUp className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "savings",
      title: "Automate Savings",
      description: "Set up automatic transfers to your savings account",
      icon: <PiggyBank className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "education",
      title: "Learn Financial Basics",
      description: "Complete basic financial literacy modules",
      icon: <GraduationCap className="w-5 h-5" />,
      completed: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const completionPercentage = (completedCount / items.length) * 100;

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground">
            Financial Onboarding
          </CardTitle>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">
              {completedCount}/{items.length}
            </p>
            <p className="text-sm text-muted-foreground">completed</p>
          </div>
        </div>
        <div className="bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-financial transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-200 hover:bg-muted/30 ${
              item.completed 
                ? 'bg-success/5 border-success/20' 
                : 'bg-card border-border/50'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex-shrink-0 mt-0.5"
            >
              {item.completed ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-md ${
                  item.completed 
                    ? 'bg-success/10 text-success' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {item.icon}
                </div>
                <h3 className={`font-semibold ${
                  item.completed ? 'text-success line-through' : 'text-foreground'
                }`}>
                  {item.title}
                </h3>
              </div>
              <p className={`text-sm ${
                item.completed ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
        
        {completedCount === items.length && (
          <div className="mt-6 p-4 bg-gradient-success rounded-lg text-center">
            <CheckCircle className="w-12 h-12 text-success-foreground mx-auto mb-2" />
            <h3 className="text-lg font-bold text-success-foreground mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-success-foreground/80 mb-4">
              You've completed your financial onboarding. You're ready to take control of your finances!
            </p>
            <Button variant="secondary" size="lg">
              View Your Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};