import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

const MaintenanceTimeline = () => {
  const maintenanceEvents = [
    {
      id: 1,
      type: 'routine',
      title: 'Oil Change & Filter Replacement',
      daysUntil: 3,
      priority: 'high',
      estimatedCost: 450,
      duration: '2 hours',
      status: 'upcoming'
    },
    {
      id: 2,
      type: 'predictive',
      title: 'Bearing Lubrication',
      daysUntil: 15,
      priority: 'medium',
      estimatedCost: 200,
      duration: '1 hour',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'preventive',
      title: 'Gear Teeth Inspection',
      daysUntil: 28,
      priority: 'low',
      estimatedCost: 150,
      duration: '30 minutes',
      status: 'planned'
    },
    {
      id: 4,
      type: 'condition-based',
      title: 'Vibration Sensor Calibration',
      daysUntil: 45,
      priority: 'medium',
      estimatedCost: 300,
      duration: '1.5 hours',
      status: 'scheduled'
    },
    {
      id: 5,
      type: 'major-overhaul',
      title: 'Complete Gearbox Overhaul',
      daysUntil: 120,
      priority: 'critical',
      estimatedCost: 2500,
      duration: '8 hours',
      status: 'projected'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'high': return 'bg-warning/20 text-warning border-warning/30';
      case 'medium': return 'bg-info/20 text-info border-info/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <AlertTriangle className="h-4 w-4" />;
      case 'scheduled': return <Calendar className="h-4 w-4" />;
      case 'planned': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <Card className="shadow-elegant border-primary/10 bg-gradient-card backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3 text-foreground">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow animate-pulse-glow">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="font-mono text-sm tracking-wider uppercase">Maintenance Timeline</span>
            <p className="text-xs text-muted-foreground font-normal">Predictive Maintenance Schedule</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {maintenanceEvents.map((event, index) => (
            <div 
              key={event.id}
              className="group relative pl-6 pb-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline Line */}
              <div className="absolute left-0 top-2 w-px h-full bg-border"></div>
              
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary shadow-glow animate-float" 
                   style={{ animationDelay: `${index * 200}ms` }}></div>
              
              <div className="bg-card/50 rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-smooth group-hover:shadow-elegant">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(event.status)}
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                  </div>
                  <Badge className={`${getPriorityColor(event.priority)} text-xs uppercase font-mono`}>
                    {event.priority}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Due in</p>
                    <p className="font-mono text-primary">{event.daysUntil} days</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="font-mono text-foreground">{event.duration}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs">Cost Est.</p>
                    <p className="font-mono text-accent">${event.estimatedCost}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Maintenance Cost (6 months):</span>
            <span className="font-mono text-primary font-medium">
              $3,600
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceTimeline;