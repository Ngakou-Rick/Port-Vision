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

const StatCard = ({ title, value, icon: Icon, colorClass = "text-primary" }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 bg-primary/10 rounded-full`}>
          <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

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
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Jean Dupont" onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Analyses aujourd'hui" value="24" icon={Activity} />
          <StatCard title="Conteneurs scannés" value="156" icon={CheckCircle} colorClass="text-green-500" />
          <StatCard title="Taux de réussite" value="94.2%" icon={TrendingUp} colorClass="text-blue-500" />
          <StatCard title="Temps moyen" value="2.3s" icon={Clock} colorClass="text-orange-500" />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
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
                  Les 10 dernières analyses effectuées sur la plateforme.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisHistory.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Aucune analyse récente</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Effectuez votre première analyse pour consulter l'historique ici.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysisHistory.map((analysis, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-secondary rounded-full">
                            {analysis.imageUrl ? (
                              <Camera className="h-5 w-5 text-secondary-foreground" />
                            ) : (
                              <Container className="h-5 w-5 text-secondary-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">
                              {analysis.containerNumber || "Analyse d'image"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(analysis.timestamp || analysis.lastUpdate).toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            {analysis.objects?.length || analysis.contents?.length || 0} objets
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Analyse réussie" />
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
