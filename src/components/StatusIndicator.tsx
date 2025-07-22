import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  title: string;
  status: 'healthy' | 'warning' | 'critical';
  value: string;
  unit?: string;
  description?: string;
}

const StatusIndicator = ({ title, status, value, unit, description }: StatusIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-success-foreground shadow-success';
      case 'warning':
        return 'bg-destructive text-destructive-foreground shadow-warning';
      case 'critical':
        return 'bg-destructive text-destructive-foreground shadow-warning animate-pulse';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'HEALTHY';
      case 'warning':
        return 'WARNING';
      case 'critical':
        return 'CRITICAL';
      default:
        return 'UNKNOWN';
    }
  };

  const getCardStyles = () => {
    switch (status) {
      case 'healthy':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-destructive/20 bg-destructive/5';
      case 'critical':
        return 'border-destructive/40 bg-destructive/10 animate-pulse';
      default:
        return '';
    }
  };

  return (
    <Card className={cn("shadow-card transition-all duration-300", getCardStyles())}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono tracking-wider uppercase text-muted-foreground">
            {title}
          </CardTitle>
          <Badge className={cn("text-xs font-bold px-2 py-1", getStatusColor())}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-mono text-foreground">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground font-mono">
                {unit}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusIndicator;