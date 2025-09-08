"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import ImageUpload from "@/components/dashboard/image-upload";
import ContainerInput from "@/components/dashboard/container-input";
import { 
  Camera, 
  Container, 
  BarChart3, 
  History, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);

  const handleImageUpload = (file: File) => {
    console.log("Image uploaded:", file);
  };

  const handleContainerSearch = (containerNumber: string) => {
    console.log("Container searched:", containerNumber);
  };

  const handleAnalysisComplete = (results: any) => {
    setAnalysisHistory(prev => [results, ...prev.slice(0, 9)]); // Keep last 10
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout requested");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader userName="Jean Dupont" onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Analyses aujourd'hui</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conteneurs scannés</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taux de réussite</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Temps moyen</p>
                  <p className="text-2xl font-bold">2.3s</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Upload d'Image
            </TabsTrigger>
            <TabsTrigger value="container" className="flex items-center gap-2">
              <Container className="h-4 w-4" />
              Numéro Conteneur
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </TabsContent>

          <TabsContent value="container">
            <ContainerInput 
              onContainerSearch={handleContainerSearch}
              onAnalysisComplete={handleAnalysisComplete}
            />
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Historique des Analyses
                </CardTitle>
                <CardDescription>
                  Dernières analyses effectuées
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Aucune analyse récente</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Effectuez votre première analyse pour voir l'historique
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysisHistory.map((analysis, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {analysis.imageUrl ? (
                              <Camera className="h-5 w-5 text-primary" />
                            ) : (
                              <Container className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {analysis.containerNumber || "Analyse d'image"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(analysis.timestamp || analysis.lastUpdate).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {analysis.objects?.length || analysis.contents?.length || 0} objets
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
