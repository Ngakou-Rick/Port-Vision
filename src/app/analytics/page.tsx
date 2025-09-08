"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricsCard from "@/components/analytics/metrics-card";
import AnalyticsCharts from "@/components/analytics/analytics-charts";
import ActivityFeed from "@/components/analytics/activity-feed";
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Container,
  Camera,
  Download,
  Calendar,
  Filter
} from "lucide-react";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    console.log("Logout requested");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader userName="Jean Dupont" onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Statistiques</h1>
            <p className="text-muted-foreground mt-2">
              Tableaux de bord et analyses détaillées de vos opérations portuaires
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Période
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Analyses Total"
            value="1,247"
            description="Ce mois"
            icon={BarChart3}
            trend={{ value: 12.5, isPositive: true }}
          />
          <MetricsCard
            title="Taux de Réussite"
            value="94.2%"
            description="Moyenne sur 30 jours"
            icon={CheckCircle}
            trend={{ value: 2.1, isPositive: true }}
          />
          <MetricsCard
            title="Temps Moyen"
            value="2.3s"
            description="Par analyse"
            icon={Clock}
            trend={{ value: -8.3, isPositive: true }}
          />
          <MetricsCard
            title="Utilisateurs Actifs"
            value="23"
            description="Cette semaine"
            icon={Users}
            trend={{ value: 15.2, isPositive: true }}
          />
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Container className="h-5 w-5" />
                Conteneurs Analysés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">892</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>+18% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Images Traitées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">1,156</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>+22% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Erreurs Détectées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">73</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span>-5% vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Graphiques
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activités
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Globale</CardTitle>
                  <CardDescription>
                    Indicateurs clés de performance sur les 30 derniers jours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">94.2%</div>
                      <div className="text-sm text-muted-foreground">Précision</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2.3s</div>
                      <div className="text-sm text-muted-foreground">Temps moyen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">99.8%</div>
                      <div className="text-sm text-muted-foreground">Disponibilité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">4.7/5</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                  <CardDescription>
                    Résumé des dernières 24 heures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-semibold">24</div>
                        <div className="text-sm text-muted-foreground">Analyses réussies</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Container className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-semibold">18</div>
                        <div className="text-sm text-muted-foreground">Conteneurs scannés</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-orange-600" />
                      <div>
                        <div className="font-semibold">2</div>
                        <div className="text-sm text-muted-foreground">Erreurs détectées</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="charts">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="activities">
            <ActivityFeed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
