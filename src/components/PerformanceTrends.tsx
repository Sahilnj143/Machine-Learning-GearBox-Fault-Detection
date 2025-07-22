import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, TrendingUp, BarChart3, Zap, Gauge } from 'lucide-react';

const PerformanceTrends = () => {
  // Mock performance data
  const performanceData = [
    { month: 'Jan', efficiency: 98.5, vibration: 2.1, temperature: 58, load: 72 },
    { month: 'Feb', efficiency: 98.2, vibration: 2.3, temperature: 60, load: 75 },
    { month: 'Mar', efficiency: 97.8, vibration: 2.5, temperature: 62, load: 78 },
    { month: 'Apr', efficiency: 97.5, vibration: 2.8, temperature: 64, load: 80 },
    { month: 'May', efficiency: 97.0, vibration: 3.1, temperature: 65, load: 82 },
    { month: 'Jun', efficiency: 96.5, vibration: 3.4, temperature: 67, load: 85 }
  ];

  const kpiData = [
    {
      metric: 'Overall Efficiency',
      current: 96.5,
      baseline: 98.5,
      change: -2.0,
      trend: 'decreasing',
      unit: '%',
      status: 'warning'
    },
    {
      metric: 'Energy Consumption',
      current: 127.5,
      baseline: 120.0,
      change: 6.25,
      trend: 'increasing',
      unit: 'kW',
      status: 'warning'
    },
    {
      metric: 'Output Torque',
      current: 385,
      baseline: 400,
      change: -3.75,
      trend: 'decreasing',
      unit: 'Nm',
      status: 'monitor'
    },
    {
      metric: 'Operational Speed',
      current: 1475,
      baseline: 1500,
      change: -1.67,
      trend: 'decreasing',
      unit: 'RPM',
      status: 'monitor'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'monitor': return 'text-info';
      case 'good': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'increasing') {
      return <TrendingUp className={`h-4 w-4 ${change > 0 ? 'text-destructive' : 'text-success'}`} />;
    }
    return <TrendingDown className={`h-4 w-4 ${change < 0 ? 'text-warning' : 'text-success'}`} />;
  };

  return (
    <Card className="shadow-elegant border-info/20 bg-gradient-card backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-success rounded-lg shadow-success animate-pulse-glow">
            <BarChart3 className="h-5 w-5 text-success-foreground" />
          </div>
          <div>
            <span className="font-mono text-sm tracking-wider uppercase text-foreground">Performance Trends</span>
            <p className="text-xs text-muted-foreground font-normal">6-Month Performance Analysis</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Overview */}
        <div className="grid grid-cols-2 gap-3">
          {kpiData.map((kpi, index) => (
            <div 
              key={kpi.metric}
              className="bg-card/30 rounded-lg p-3 border border-border/30 hover:border-primary/20 transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">{kpi.metric}</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(kpi.trend, kpi.change)}
                  <span className={`text-xs font-mono ${getStatusColor(kpi.status)}`}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-lg font-bold font-mono text-primary">
                {kpi.current} {kpi.unit}
              </div>
              <div className="text-xs text-muted-foreground">
                Baseline: {kpi.baseline} {kpi.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-muted/10 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-primary" />
            <span>Efficiency Trend (6 Months)</span>
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--border))"
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--border))"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#efficiencyGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Degradation Analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground flex items-center space-x-2">
            <Zap className="h-4 w-4 text-warning" />
            <span>Performance Degradation Factors</span>
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-card/30 rounded-lg p-3 border border-border/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Mechanical Wear Impact</span>
                <span className="text-xs text-warning font-mono">-1.8% efficiency</span>
              </div>
              <Progress value={72} className="h-2 bg-warning" />
              <div className="text-xs text-muted-foreground mt-1">Primary contributor to performance loss</div>
            </div>

            <div className="bg-card/30 rounded-lg p-3 border border-border/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Lubrication Degradation</span>
                <span className="text-xs text-info font-mono">-0.8% efficiency</span>
              </div>
              <Progress value={45} className="h-2 bg-info" />
              <div className="text-xs text-muted-foreground mt-1">Moderate impact, increasing over time</div>
            </div>

            <div className="bg-card/30 rounded-lg p-3 border border-border/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-foreground">Thermal Effects</span>
                <span className="text-xs text-success font-mono">-0.2% efficiency</span>
              </div>
              <Progress value={18} className="h-2 bg-success" />
              <div className="text-xs text-muted-foreground mt-1">Minor impact, well controlled</div>
            </div>
          </div>
        </div>

        {/* Predictive Forecast */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-warning mb-2 flex items-center space-x-2">
            <TrendingDown className="h-4 w-4" />
            <span>Performance Forecast</span>
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• <span className="text-warning font-medium">3 Months:</span> Efficiency may drop to 95.2% without intervention</p>
            <p>• <span className="text-destructive font-medium">6 Months:</span> Critical threshold (94%) likely reached</p>
            <p>• <span className="text-primary font-medium">Recommendation:</span> Schedule maintenance within 60 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrends;