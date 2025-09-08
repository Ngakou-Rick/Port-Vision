"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  CheckCircle, 
  AlertCircle,
  Camera,
  FileImage
} from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onAnalysisComplete: (results: any) => void;
}

export default function ImageUpload({ onImageUpload, onAnalysisComplete }: ImageUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...imageFiles]);
      // Auto-upload the first image
      if (imageFiles.length === 1) {
        handleAnalyzeImage(imageFiles[0]);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  const handleAnalyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResults(null);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis results
      const mockResults = {
        containerNumber: "MSKU1234567",
        objects: [
          { name: "Conteneur 20 pieds", confidence: 0.95, boundingBox: { x: 10, y: 20, width: 300, height: 200 } },
          { name: "Grue portuaire", confidence: 0.87, boundingBox: { x: 50, y: 100, width: 150, height: 300 } },
          { name: "Chariot élévateur", confidence: 0.78, boundingBox: { x: 200, y: 250, width: 120, height: 80 } }
        ],
        timestamp: new Date().toISOString(),
        imageUrl: URL.createObjectURL(file)
      };

      setAnalysisResults(mockResults);
      onAnalysisComplete(mockResults);
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
      clearInterval(progressInterval);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setAnalysisResults(null);
    }
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setAnalysisResults(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Upload d'Image
          </CardTitle>
          <CardDescription>
            Glissez-déposez une image ou cliquez pour la sélectionner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
              }
              ${isAnalyzing ? 'pointer-events-none opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                {isDragActive ? (
                  <Upload className="h-8 w-8 text-primary" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive 
                    ? "Déposez l'image ici" 
                    : "Glissez-déposez une image ou cliquez pour sélectionner"
                  }
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Formats supportés: JPG, PNG, GIF, BMP, WebP (max 10MB)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                Images Uploadées
              </CardTitle>
              <Button variant="outline" size="sm" onClick={clearAll}>
                Tout effacer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAnalyzing && index === 0 && (
                      <div className="flex items-center gap-2">
                        <Progress value={analysisProgress} className="w-20" />
                        <span className="text-sm text-muted-foreground">
                          {Math.round(analysisProgress)}%
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      disabled={isAnalyzing}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Résultats d'Analyse
            </CardTitle>
            <CardDescription>
              Objets détectés dans l'image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={analysisResults.imageUrl}
                    alt="Analyzed"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Numéro de conteneur détecté:</h4>
                    <p className="text-lg font-mono bg-muted p-2 rounded">
                      {analysisResults.containerNumber}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Objets identifiés:</h4>
                    <div className="space-y-2">
                      {analysisResults.objects.map((obj: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="font-medium">{obj.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {Math.round(obj.confidence * 100)}%
                            </span>
                            <div className="w-16 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${obj.confidence * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
