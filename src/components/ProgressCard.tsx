import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  current: number;
  target: number;
  icon: React.ReactNode;
  format?: 'currency' | 'percentage' | 'number';
}

export const ProgressCard = ({ title, current, target, icon, format = 'currency' }: ProgressCardProps) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-financial hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            {icon}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {formatValue(current)}
            </p>
            <p className="text-sm text-muted-foreground">
              of {formatValue(target)}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className="text-sm font-medium text-primary">
              {Math.round(percentage)}%
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};