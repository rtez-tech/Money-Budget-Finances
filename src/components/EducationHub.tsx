import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Calculator,
  Clock,
  Star,
  CheckCircle
} from "lucide-react";

interface EducationModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  progress: number;
  icon: React.ReactNode;
  category: string;
}

export const EducationHub = () => {
  const modules: EducationModule[] = [
    {
      id: "budgeting-basics",
      title: "Budgeting Fundamentals",
      description: "Learn the 50/30/20 rule and create your first budget",
      duration: "15 min",
      difficulty: "Beginner",
      completed: true,
      progress: 100,
      icon: <Calculator className="w-5 h-5" />,
      category: "Budgeting",
    },
    {
      id: "emergency-fund",
      title: "Building Emergency Funds",
      description: "Why you need 3-6 months of expenses saved",
      duration: "12 min",
      difficulty: "Beginner",
      completed: true,
      progress: 100,
      icon: <Shield className="w-5 h-5" />,
      category: "Saving",
    },
    {
      id: "debt-strategies",
      title: "Debt Elimination Strategies",
      description: "Avalanche vs Snowball methods explained",
      duration: "18 min",
      difficulty: "Intermediate",
      completed: false,
      progress: 65,
      icon: <TrendingUp className="w-5 h-5" />,
      category: "Debt Management",
    },
    {
      id: "investing-101",
      title: "Investment Basics",
      description: "Stocks, bonds, and index funds for beginners",
      duration: "25 min",
      difficulty: "Intermediate",
      completed: false,
      progress: 0,
      icon: <TrendingUp className="w-5 h-5" />,
      category: "Investing",
    },
    {
      id: "retirement-planning",
      title: "Retirement Planning",
      description: "401k, IRA, and compound interest explained",
      duration: "20 min",
      difficulty: "Intermediate",
      completed: false,
      progress: 0,
      icon: <PiggyBank className="w-5 h-5" />,
      category: "Retirement",
    },
    {
      id: "tax-optimization",
      title: "Tax Optimization",
      description: "Legal ways to reduce your tax burden",
      duration: "22 min",
      difficulty: "Advanced",
      completed: false,
      progress: 0,
      icon: <BookOpen className="w-5 h-5" />,
      category: "Taxes",
    },
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const totalProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'secondary';
      case 'Intermediate': return 'default';
      case 'Advanced': return 'destructive';
      default: return 'secondary';
    }
  };

  const categories = [...new Set(modules.map(m => m.category))];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          <span>Financial Education Hub</span>
        </CardTitle>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              {completedModules}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {modules.length - completedModules}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {Math.round(totalProgress)}%
            </p>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Learning Progress</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-success fill-current" />
              <span className="text-sm text-success font-medium">
                {completedModules * 25} XP earned
              </span>
            </div>
          </div>
          <Progress value={totalProgress} className="h-3" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>

        {/* Education Modules */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
                module.completed 
                  ? 'bg-success/5 border-success/20' 
                  : 'bg-card border-border/50 hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${
                    module.completed 
                      ? 'bg-success/10 text-success' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${
                        module.completed ? 'text-success' : 'text-foreground'
                      }`}>
                        {module.title}
                      </h3>
                      {module.completed && (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {module.duration}
                        </span>
                      </div>
                      <Badge variant={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {module.category}
                      </Badge>
                    </div>

                    {!module.completed && module.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary font-medium">
                            {module.progress}%
                          </span>
                        </div>
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {module.completed ? (
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  ) : module.progress > 0 ? (
                    <Button variant="default" size="sm">
                      Continue
                    </Button>
                  ) : (
                    <Button variant="default" size="sm">
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Section */}
        <div className="mt-6 p-4 bg-gradient-success rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-success-foreground/10 rounded-lg">
              <Star className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-success-foreground">
                Keep Learning!
              </h4>
              <p className="text-sm text-success-foreground/80">
                Complete all modules to earn your Financial Literacy Certificate
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm">
              View All Achievements
            </Button>
            <Button variant="outline" size="sm">
              Share Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};