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
  const [activeTab, setActiveTab] = useState("charts");

  const handleLogout = () => {
    console.log("Logout requested");
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Jean Dupont" onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Vue d'ensemble des performances de vos opérations portuaires.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              30 derniers jours
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
            description="+12.5% ce mois"
            icon={BarChart3}
          />
          <MetricsCard
            title="Taux de Réussite"
            value="94.2%"
            description="+2.1% vs mois dernier"
            icon={CheckCircle}
          />
          <MetricsCard
            title="Temps Moyen"
            value="2.3s"
            description="-8.3% ce mois (plus rapide)"
            icon={Clock}
          />
          <MetricsCard
            title="Utilisateurs Actifs"
            value="23"
            description="+3 actifs cette semaine"
            icon={Users}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Graphiques
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activités
            </TabsTrigger>
          </TabsList>

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
