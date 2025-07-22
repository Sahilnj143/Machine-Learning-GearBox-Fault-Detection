import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertCircle, FolderOpen, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DataUploadProps {
  onDataUpload?: (data: any) => void;
}

const DataUpload = ({ onDataUpload }: DataUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [analysisResults, setAnalysisResults] = useState<{
    healthy: { files: number; avgVibration: number; status: string };
    faulty: { files: number; avgVibration: number; status: string };
    totalFiles: number;
  } | null>(null);

  const handleFolderUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadedFiles(files);
    setIsUploading(true);
    setUploadProgress(0);
    setAnalysisResults(null);

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
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setIsUploading(false);
      setIsAnalyzing(true);

      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis results
      const healthyFiles = Math.floor(files.length * 0.6);
      const faultyFiles = files.length - healthyFiles;
      
      const results = {
        healthy: {
          files: healthyFiles,
          avgVibration: 2.1,
          status: 'Normal Operation'
        },
        faulty: {
          files: faultyFiles,
          avgVibration: 5.8,
          status: 'Broken Tooth Detected'
        },
        totalFiles: files.length
      };
      
      setAnalysisResults(results);
      setIsAnalyzing(false);

      // Show success toast
      toast({
        title: "Dataset Analysis Complete",
        description: `Analyzed ${files.length} files. Found ${faultyFiles} with broken teeth conditions.`,
      });

      // Callback with analysis data
      if (onDataUpload) {
        onDataUpload({
          totalFiles: files.length,
          healthyFiles,
          faultyFiles,
          sensors: 4,
          analysisResults: results
        });
      }

    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your dataset. Please try again.",
        variant: "destructive",
      });
      setIsUploading(false);
      setIsAnalyzing(false);
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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder" className="text-sm text-muted-foreground">
              Upload Full Dataset Folder (Healthy & Broken Teeth)
            </Label>
            <input
              id="folder"
              type="file"
              {...({webkitdirectory: ""} as any)}
              multiple
              onChange={handleFolderUpload}
              disabled={isUploading || isAnalyzing}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:rounded-md file:px-3 file:py-1 file:mr-3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataset" className="text-sm text-muted-foreground">
              Upload Single Files
            </Label>
            <Input
              id="dataset"
              type="file"
              accept=".csv,.xlsx,.json"
              multiple
              onChange={handleFolderUpload}
              disabled={isUploading || isAnalyzing}
              className="cursor-pointer file:cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
            />
          </div>
        </div>

        {(isUploading || isAnalyzing) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center space-x-2">
                <Activity className="h-3 w-3 animate-spin" />
                <span>
                  {isUploading && `Processing ${uploadedFiles?.length || 0} files...`}
                  {isAnalyzing && 'Analyzing vibration patterns...'}
                </span>
              </span>
              <span className="text-primary font-mono">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {analysisResults && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-sm">
                <FolderOpen className="h-4 w-4" />
                <span>Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-success/20 text-success text-xs">HEALTHY</Badge>
                    <span className="text-sm font-medium">{analysisResults.healthy.files} files</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Avg Vibration: {analysisResults.healthy.avgVibration} mm/s</p>
                    <p>Status: {analysisResults.healthy.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-destructive/20 text-destructive text-xs">FAULTY</Badge>
                    <span className="text-sm font-medium">{analysisResults.faulty.files} files</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Avg Vibration: {analysisResults.faulty.avgVibration} mm/s</p>
                    <p>Status: {analysisResults.faulty.status}</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground border-t pt-2">
                Total Files Analyzed: <span className="font-mono text-primary">{analysisResults.totalFiles}</span>
              </div>
            </CardContent>
          </Card>
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