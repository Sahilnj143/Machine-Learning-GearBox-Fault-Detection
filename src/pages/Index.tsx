import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VibrationChart from '@/components/VibrationChart';
import StatusIndicator from '@/components/StatusIndicator';
import DataUpload from '@/components/DataUpload';
import MaintenanceTimeline from '@/components/MaintenanceTimeline';
import RiskAssessment from '@/components/RiskAssessment';
import ComponentWear from '@/components/ComponentWear';
import PerformanceTrends from '@/components/PerformanceTrends';
import { Cog, Activity, AlertTriangle, CheckCircle, Upload, Brain, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/gearbox-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload' | 'predictive'>('dashboard');

  // Sample status data
  const statusData = [
    {
      title: "Overall Health",
      status: "healthy" as const,
      value: "98.5",
      unit: "%",
      description: "All systems operational"
    },
    {
      title: "Vibration Level",
      status: "healthy" as const,
      value: "2.1",
      unit: "mm/s RMS",
      description: "Within normal limits"
    },
    {
      title: "Load Condition",
      status: "healthy" as const,
      value: "75",
      unit: "%",
      description: "Optimal operating range"
    },
    {
      title: "Temperature",
      status: "warning" as const,
      value: "65",
      unit: "°C",
      description: "Slightly elevated"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background animate-fade-in">
      {/* Enhanced Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-slide-up">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-glow animate-pulse-glow">
                <Cog className="h-6 w-6 text-primary-foreground animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono tracking-wider text-foreground animate-float">
                  GEAR WHISPERER
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  AI-Powered Predictive Maintenance System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-success/20 text-success shadow-success animate-pulse-glow border-success/30">
                <CheckCircle className="h-3 w-3 mr-1 animate-spin" style={{ animationDuration: '3s' }} />
                SYSTEM ONLINE
              </Badge>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('dashboard')}
                className="transition-bounce hover:shadow-elegant"
              >
                <Activity className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'predictive' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('predictive')}
                className="transition-bounce hover:shadow-accent"
              >
                <Brain className="h-4 w-4 mr-1" />
                AI Insights
              </Button>
              <Button
                variant={currentView === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('upload')}
                className="transition-bounce hover:shadow-glow"
              >
                <Upload className="h-4 w-4 mr-1" />
                Data Upload
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {currentView === 'dashboard' ? (
          <>
            {/* Enhanced Hero Section */}
            <Card className="mb-8 shadow-elegant overflow-hidden border-primary/20 animate-scale-in">
              <div className="relative h-56 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/20">
                <img 
                  src={heroImage}
                  alt="Advanced Gearbox Monitoring System"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-start p-8">
                  <div className="max-w-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-3xl font-bold font-mono text-foreground mb-3 animate-float">
                      Next-Gen Gearbox Intelligence
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      AI-powered vibration analysis with real-time predictive maintenance insights using
                      advanced 4-channel sensor fusion and machine learning algorithms.
                    </p>
                    <div className="flex space-x-2">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        4-Channel Monitoring
                      </Badge>
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        AI-Powered Analysis
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Enhanced Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statusData.map((item, index) => (
                <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100 + 300}ms` }}>
                  <StatusIndicator {...item} />
                </div>
              ))}
            </div>

            {/* Enhanced Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                <VibrationChart 
                  data={[]} 
                  title="Real-Time Vibration Analysis" 
                  sensorId="SENSOR-01-04"
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
                <VibrationChart 
                  data={[]} 
                  title="Frequency Domain Analysis"
                  sensorId="FFT-SPECTRUM"
                />
              </div>
            </div>

            {/* Enhanced Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-elegant border-primary/20 bg-gradient-card animate-slide-up" style={{ animationDelay: '800ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                      Load Analysis
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Load:</span>
                      <span className="font-mono text-primary text-lg animate-float">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peak Load (24h):</span>
                      <span className="font-mono text-warning">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Load (24h):</span>
                      <span className="font-mono text-foreground">62%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Efficiency:</span>
                      <span className="font-mono text-success">96.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-accent/20 bg-gradient-card animate-slide-up" style={{ animationDelay: '900ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                    <span className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                      AI Fault Detection
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tooth Damage:</span>
                      <Badge className="bg-success/20 text-success text-xs border-success/30 animate-pulse-glow">HEALTHY</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bearing Wear:</span>
                      <Badge className="bg-warning/20 text-warning text-xs border-warning/30 animate-pulse">MONITOR</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Misalignment:</span>
                      <Badge className="bg-destructive/20 text-destructive text-xs border-destructive/30">DETECTED</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Oil Quality:</span>
                      <Badge className="bg-success/20 text-success text-xs border-success/30">OPTIMAL</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-success/20 bg-gradient-card animate-slide-up" style={{ animationDelay: '1000ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-success" />
                    <span className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                      Sensor Network
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Sensor 1 (X-Axis)', 'Sensor 2 (Y-Axis)', 'Sensor 3 (Z-Axis)', 'Sensor 4 (Axial)'].map((sensor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{sensor}:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-success" />
                          <span className="text-xs font-mono text-success">ACTIVE</span>
                          <span className="text-xs text-muted-foreground">({(Math.random() * 5 + 95).toFixed(1)}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : currentView === 'predictive' ? (
          <div className="space-y-6 animate-fade-in">
            {/* AI Insights Header */}
            <div className="text-center mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold font-mono text-foreground mb-2">
                Predictive Maintenance Intelligence
              </h2>
              <p className="text-muted-foreground">
                Advanced AI-powered insights for proactive gearbox maintenance
              </p>
            </div>

            {/* Predictive Components Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
                <MaintenanceTimeline />
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
                <RiskAssessment />
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '400ms' }}>
                <ComponentWear />
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '500ms' }}>
                <PerformanceTrends />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold font-mono text-foreground mb-2">
                Dataset Upload & Analysis
              </h2>
              <p className="text-muted-foreground">
                Upload your gearbox vibration data for AI-powered fault analysis
              </p>
            </div>
            <DataUpload onDataUpload={(data) => {
              console.log('Data uploaded:', data);
              setCurrentView('dashboard');
            }} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
