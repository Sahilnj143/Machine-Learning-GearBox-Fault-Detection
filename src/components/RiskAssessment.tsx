import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Zap, TrendingUp, Gauge } from 'lucide-react';

const RiskAssessment = () => {
  const riskFactors = [
    {
      category: 'Vibration Levels',
      current: 78,
      threshold: 85,
      trend: 'increasing',
      severity: 'medium',
      description: 'Elevated but within acceptable range',
      icon: Gauge
    },
    {
      category: 'Temperature',
      current: 65,
      threshold: 75,
      trend: 'stable',
      severity: 'low',
      description: 'Normal operating temperature',
      icon: TrendingUp
    },
    {
      category: 'Load Stress',
      current: 92,
      threshold: 90,
      trend: 'increasing',
      severity: 'high',
      description: 'Exceeding recommended load limits',
      icon: Zap
    },
    {
      category: 'Component Age',
      current: 68,
      threshold: 80,
      trend: 'stable',
      severity: 'medium',
      description: 'Components showing signs of wear',
      icon: Shield
    }
  ];

  const overallRisk = Math.round(
    riskFactors.reduce((sum, factor) => sum + (factor.current / factor.threshold * 100), 0) / riskFactors.length
  );

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (current: number, threshold: number) => {
    const ratio = current / threshold;
    if (ratio >= 1) return 'bg-destructive';
    if (ratio >= 0.8) return 'bg-warning';
    return 'bg-success';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      default: return '→';
    }
  };

  return (
    <Card className="shadow-elegant border-warning/20 bg-gradient-card backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-warning rounded-lg shadow-warning animate-pulse-glow">
              <AlertTriangle className="h-5 w-5 text-warning-foreground" />
            </div>
            <div>
              <span className="font-mono text-sm tracking-wider uppercase text-foreground">Risk Assessment</span>
              <p className="text-xs text-muted-foreground font-normal">Real-time Risk Analysis</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-xs font-mono uppercase ${
              overallRisk >= 80 ? 'bg-destructive/20 text-destructive' :
              overallRisk >= 60 ? 'bg-warning/20 text-warning' :
              'bg-success/20 text-success'
            }`}>
              {overallRisk}% Risk
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Risk Gauge */}
        <div className="bg-muted/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall System Risk</span>
            <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
          </div>
          <Progress 
            value={overallRisk} 
            className={`h-3 ${getProgressColor(overallRisk, 100)}`} 
          />
          <div className="mt-2 text-xs text-muted-foreground">
            Risk Level: <span className={`font-medium ${
              overallRisk >= 80 ? 'text-destructive' :
              overallRisk >= 60 ? 'text-warning' :
              'text-success'
            }`}>
              {overallRisk >= 80 ? 'HIGH' : overallRisk >= 60 ? 'MEDIUM' : 'LOW'}
            </span>
          </div>
        </div>

        {/* Individual Risk Factors */}
        <div className="space-y-3">
          {riskFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div 
                key={factor.category}
                className="bg-card/30 rounded-lg p-4 border border-border/30 hover:border-primary/20 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{factor.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{getTrendIcon(factor.trend)}</span>
                    <Badge className={`${getRiskColor(factor.severity)} text-xs uppercase`}>
                      {factor.severity}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-2">
                  <Progress 
                    value={(factor.current / factor.threshold) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{factor.description}</span>
                  <span className="font-mono text-foreground">
                    {factor.current}/{factor.threshold}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Recommendations */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
          <h4 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Risk Mitigation Recommendations</span>
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Reduce operating load to below 90% capacity</li>
            <li>• Schedule bearing inspection within 7 days</li>
            <li>• Monitor temperature sensors more frequently</li>
            <li>• Consider early maintenance intervention</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;