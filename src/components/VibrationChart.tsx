import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VibrationData {
  time: number;
  sensor1: number;
  sensor2: number;
  sensor3: number;
  sensor4: number;
}

interface VibrationChartProps {
  data: VibrationData[];
  title: string;
  sensorId?: string;
}

const VibrationChart = ({ data, title, sensorId }: VibrationChartProps) => {
  // Generate sample data if none provided
  const sampleData: VibrationData[] = data.length > 0 ? data : 
    Array.from({ length: 50 }, (_, i) => ({
      time: i,
      sensor1: Math.sin(i * 0.2) * 2 + Math.random() * 0.5,
      sensor2: Math.cos(i * 0.15) * 1.5 + Math.random() * 0.3,
      sensor3: Math.sin(i * 0.25) * 1.8 + Math.random() * 0.4,
      sensor4: Math.cos(i * 0.3) * 2.2 + Math.random() * 0.6,
    }));

  return (
    <Card className="bg-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground font-mono text-sm tracking-wider uppercase">
          {title}
          {sensorId && (
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
              {sensorId}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontFamily="monospace"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontFamily="monospace"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--popover-foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sensor1" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              name="Sensor 1"
            />
            <Line 
              type="monotone" 
              dataKey="sensor2" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={false}
              name="Sensor 2"
            />
            <Line 
              type="monotone" 
              dataKey="sensor3" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={false}
              name="Sensor 3"
            />
            <Line 
              type="monotone" 
              dataKey="sensor4" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              dot={false}
              name="Sensor 4"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VibrationChart;