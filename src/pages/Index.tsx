import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFinancialData } from "@/hooks/useFinancialData";
import { OnboardingChecklist } from "@/components/OnboardingChecklist";
import { BudgetTracker } from "@/components/BudgetTracker";
import { DebtTracker } from "@/components/DebtTracker";
import { EducationHub } from "@/components/EducationHub";
import { ProgressCard } from "@/components/ProgressCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Target, 
  TrendingUp, 
  PiggyBank,
  Menu,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";
import financialHero from "@/assets/financial-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, loading, signOut } = useAuth();
  const financialData = useFinancialData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-financial rounded-lg">
                <DollarSign className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">MoneyMaster</h1>
                <p className="text-sm text-muted-foreground">Your Financial Journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-financial py-16">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${financialHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Your complete money management solution for budgeting, debt elimination, 
            and financial education all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setActiveTab("budget")}
            >
              Start Budgeting
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg"
              onClick={() => setActiveTab("learn")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Monthly Budget"
            current={financialData.monthlyBudget.current}
            target={financialData.monthlyBudget.target}
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            format="currency"
          />
          <ProgressCard
            title="Emergency Fund"
            current={financialData.emergencyFund.current}
            target={financialData.emergencyFund.target}
            icon={<PiggyBank className="w-5 h-5 text-primary" />}
            format="currency"
          />
          <ProgressCard
            title="Debt Payoff"
            current={financialData.debtPayoff.current}
            target={financialData.debtPayoff.target}
            icon={<Target className="w-5 h-5 text-primary" />}
            format="currency"
          />
          <ProgressCard
            title="Financial Score"
            current={financialData.financialScore.current}
            target={financialData.financialScore.target}
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            format="number"
          />
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="debt" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Debt</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center space-x-2">
              <PiggyBank className="w-4 h-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OnboardingChecklist />
              <div className="space-y-6">
                <BudgetTracker />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetTracker />
          </TabsContent>

          <TabsContent value="debt" className="space-y-6">
            <DebtTracker />
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <EducationHub />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <section className="mt-16 p-8 bg-gradient-financial rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Financial Future?
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have successfully eliminated debt, built emergency funds, 
            and achieved their financial goals with MoneyMaster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setActiveTab("budget")}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 shadow-lg"
              onClick={() => setActiveTab("learn")}
            >
              View Success Stories
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 MoneyMaster. Built to help you achieve financial freedom.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;