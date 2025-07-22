import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VibrationChart from '@/components/VibrationChart';
import StatusIndicator from '@/components/StatusIndicator';
import DataUpload from '@/components/DataUpload';
import { Cog, Activity, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import heroImage from '@/assets/gearbox-hero.jpg';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'upload'>('dashboard');

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
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Cog className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-mono tracking-wider text-foreground">
                  GEAR WHISPERER
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Predictive Maintenance System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-success text-success-foreground shadow-success">
                <CheckCircle className="h-3 w-3 mr-1" />
                ONLINE
              </Badge>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('dashboard')}
              >
                <Activity className="h-4 w-4 mr-1" />
                Dashboard
              </Button>
              <Button
                variant={currentView === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('upload')}
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
            {/* Hero Section */}
            <Card className="mb-6 shadow-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-primary/20 to-accent/20">
                <img 
                  src={heroImage}
                  alt="Gearbox Monitoring System"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-start p-8">
                  <div className="max-w-md">
                    <h2 className="text-2xl font-bold font-mono text-foreground mb-2">
                      Gearbox Health Monitoring
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Real-time vibration analysis using 4-channel sensor data for predictive maintenance
                      and fault detection in industrial gearbox systems.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statusData.map((item, index) => (
                <StatusIndicator key={index} {...item} />
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <VibrationChart 
                data={[]} 
                title="Time Domain Analysis" 
                sensorId="SENSOR-01-04"
              />
              <VibrationChart 
                data={[]} 
                title="Frequency Domain Analysis"
                sensorId="FFT-ANALYSIS"
              />
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                    Load Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Load:</span>
                      <span className="font-mono text-primary">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max Load Today:</span>
                      <span className="font-mono text-foreground">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Load (24h):</span>
                      <span className="font-mono text-foreground">62%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                    Fault Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tooth Damage:</span>
                      <Badge className="bg-success/20 text-success text-xs">HEALTHY</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bearing Wear:</span>
                      <Badge className="bg-success/20 text-success text-xs">HEALTHY</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Misalignment:</span>
                      <Badge className="bg-destructive/20 text-destructive text-xs">MINOR</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-mono text-sm tracking-wider uppercase text-muted-foreground">
                    Sensor Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Sensor 1 (X-Axis)', 'Sensor 2 (Y-Axis)', 'Sensor 3 (Z-Axis)', 'Sensor 4 (Axial)'].map((sensor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{sensor}:</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                          <span className="text-xs font-mono text-success">ACTIVE</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
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
