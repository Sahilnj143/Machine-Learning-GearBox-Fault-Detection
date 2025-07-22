import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DataUploadProps {
  onDataUpload?: (data: any) => void;
}

const DataUpload = ({ onDataUpload }: DataUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file processing with progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Show success toast
      toast({
        title: "Dataset Uploaded Successfully",
        description: `${file.name} has been processed and is ready for analysis.`,
      });

      // Simulate data processing callback
      if (onDataUpload) {
        onDataUpload({
          fileName: file.name,
          sensors: 4,
          dataPoints: 1000,
          loadConditions: '0-90%'
        });
      }

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing your dataset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setFileName('');
      }, 3000);
    }
  }, [onDataUpload]);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground font-mono text-sm tracking-wider uppercase">
          <Upload className="h-4 w-4" />
          <span>Dataset Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dataset" className="text-sm text-muted-foreground">
            Upload Vibration Dataset
          </Label>
          <Input
            id="dataset"
            type="file"
            accept=".csv,.xlsx,.json"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
          />
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing {fileName}...</span>
              <span className="text-primary font-mono">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Supported formats:</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1 ml-6">
            <li>• CSV files with sensor data columns</li>
            <li>• Excel files (.xlsx) with structured data</li>
            <li>• JSON files with time-series data</li>
          </ul>
        </div>

        <div className="flex items-start space-x-2 text-xs text-muted-foreground bg-primary/10 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-primary mb-1">Dataset Requirements:</p>
            <ul className="space-y-0.5">
              <li>• 4 sensor channels (X, Y, Z, Axial directions)</li>
              <li>• Load conditions from 0% to 90%</li>
              <li>• Healthy and faulty condition labels</li>
            </ul>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          disabled={isUploading}
          onClick={() => window.open('https://drive.google.com/file/d/1nNNnjMPntlo5X0t_cif7cmlJhikCyWyP/view?usp=sharing', '_blank')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Download Sample Dataset
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataUpload;