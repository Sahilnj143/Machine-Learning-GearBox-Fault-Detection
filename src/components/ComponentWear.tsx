import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Cog, Zap, Wrench, Settings, Activity } from 'lucide-react';

const ComponentWear = () => {
  const components = [
    {
      name: 'Input Shaft Bearing',
      wearLevel: 75,
      expectedLife: '18 months',
      remainingLife: '4.5 months',
      status: 'monitor',
      lastReplaced: '2022-06-15',
      icon: Cog
    },
    {
      name: 'Gear Teeth (Primary)',
      wearLevel: 45,
      expectedLife: '24 months',
      remainingLife: '13.2 months',
      status: 'good',
      lastReplaced: '2023-01-20',
      icon: Settings
    },
    {
      name: 'Output Shaft Coupling',
      wearLevel: 92,
      expectedLife: '15 months',
      remainingLife: '1.2 months',
      status: 'critical',
      lastReplaced: '2023-03-10',
      icon: Zap
    },
    {
      name: 'Lubrication System',
      wearLevel: 35,
      expectedLife: '36 months',
      remainingLife: '23.4 months',
      status: 'excellent',
      lastReplaced: '2023-05-01',
      icon: Activity
    },
    {
      name: 'Seals & Gaskets',
      wearLevel: 68,
      expectedLife: '12 months',
      remainingLife: '3.8 months',
      status: 'monitor',
      lastReplaced: '2023-11-15',
      icon: Wrench
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-destructive-foreground shadow-warning';
      case 'monitor': return 'bg-warning text-warning-foreground shadow-warning';
      case 'good': return 'bg-info text-info-foreground shadow-elegant';
      case 'excellent': return 'bg-success text-success-foreground shadow-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getWearColor = (wearLevel: number) => {
    if (wearLevel >= 90) return 'bg-destructive';
    if (wearLevel >= 70) return 'bg-warning';
    if (wearLevel >= 40) return 'bg-info';
    return 'bg-success';
  };

  return (
    <Card className="shadow-elegant border-accent/20 bg-gradient-card backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-secondary rounded-lg shadow-accent animate-pulse-glow">
            <Cog className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <span className="font-mono text-sm tracking-wider uppercase text-foreground">Component Wear Analysis</span>
            <p className="text-xs text-muted-foreground font-normal">Predictive Component Lifecycle</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold font-mono text-destructive">1</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold font-mono text-warning">2</div>
            <div className="text-xs text-muted-foreground">Monitor</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 text-center">
            <div className="text-lg font-bold font-mono text-success">2</div>
            <div className="text-xs text-muted-foreground">Good</div>
          </div>
        </div>

        {/* Component List */}
        <div className="space-y-3">
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <div 
                key={component.name}
                className="bg-card/30 rounded-lg p-4 border border-border/30 hover:border-primary/20 transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{component.name}</span>
                  </div>
                  <Badge className={`${getStatusColor(component.status)} text-xs uppercase animate-float`}>
                    {component.status}
                  </Badge>
                </div>

                {/* Wear Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Wear Level</span>
                    <span className="font-mono text-foreground">{component.wearLevel}%</span>
                  </div>
                  <Progress 
                    value={component.wearLevel} 
                    className={`h-2 ${getWearColor(component.wearLevel)}`}
                  />
                </div>

                {/* Component Details */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Remaining Life</p>
                    <p className="font-mono text-primary">{component.remainingLife}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Expected Life</p>
                    <p className="font-mono text-foreground">{component.expectedLife}</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p className="text-muted-foreground">Last Replaced</p>
                    <p className="font-mono text-accent">{new Date(component.lastReplaced).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Replacement Urgency Indicator */}
                {component.wearLevel >= 85 && (
                  <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs">
                    <span className="text-destructive font-medium">⚠️ Replacement Required Soon</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Maintenance Planning */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
            <Wrench className="h-4 w-4" />
            <span>Next Maintenance Window</span>
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• <span className="text-destructive font-medium">Critical:</span> Output Shaft Coupling - Replace within 1-2 months</p>
            <p>• <span className="text-warning font-medium">Monitor:</span> Input Shaft Bearing - Inspect monthly</p>
            <p>• <span className="text-info font-medium">Scheduled:</span> Seals & Gaskets - Plan replacement in 3-4 months</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentWear;