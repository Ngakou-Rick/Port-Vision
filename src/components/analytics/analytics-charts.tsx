"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for charts
const dailyAnalyses = [
  { date: "2024-01-01", analyses: 12, containers: 8, success: 11 },
  { date: "2024-01-02", analyses: 18, containers: 14, success: 17 },
  { date: "2024-01-03", analyses: 25, containers: 20, success: 23 },
  { date: "2024-01-04", analyses: 22, containers: 18, success: 21 },
  { date: "2024-01-05", analyses: 30, containers: 25, success: 28 },
  { date: "2024-01-06", analyses: 28, containers: 22, success: 26 },
  { date: "2024-01-07", analyses: 35, containers: 30, success: 33 },
];

const hourlyDistribution = [
  { hour: "00h", analyses: 2 },
  { hour: "02h", analyses: 1 },
  { hour: "04h", analyses: 0 },
  { hour: "06h", analyses: 5 },
  { hour: "08h", analyses: 15 },
  { hour: "10h", analyses: 25 },
  { hour: "12h", analyses: 30 },
  { hour: "14h", analyses: 28 },
  { hour: "16h", analyses: 35 },
  { hour: "18h", analyses: 20 },
  { hour: "20h", analyses: 12 },
  { hour: "22h", analyses: 8 },
];

const objectTypes = [
  { name: "Conteneurs", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Grues", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Chariots", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Véhicules", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Autres", value: 8, color: "hsl(var(--chart-5))" },
];

const performanceMetrics = [
  { metric: "Précision", value: 94.2, target: 95 },
  { metric: "Vitesse", value: 2.3, target: 2.0 },
  { metric: "Disponibilité", value: 99.8, target: 99.5 },
  { metric: "Satisfaction", value: 4.7, target: 4.5 },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid gap-6">
      {/* Daily Analyses Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Analyses</CardTitle>
          <CardDescription>
            Nombre d'analyses effectuées par jour (7 derniers jours)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyAnalyses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                formatter={(value, name) => [value, name === 'analyses' ? 'Analyses' : name === 'containers' ? 'Conteneurs' : 'Succès']}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="analyses" 
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="Total analyses"
              />
              <Line 
                type="monotone" 
                dataKey="containers" 
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Conteneurs scannés"
              />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="Analyses réussies"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Horaire</CardTitle>
          <CardDescription>
            Répartition des analyses par heure de la journée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Analyses']} />
              <Bar dataKey="analyses" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Object Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Types d'Objets Détectés</CardTitle>
            <CardDescription>
              Répartition des objets identifiés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={objectTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {objectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Objets']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Métriques de Performance</CardTitle>
            <CardDescription>
              Indicateurs clés de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.metric}</span>
                    <span className="font-medium">
                      {metric.value}{metric.metric === 'Satisfaction' ? '/5' : metric.metric === 'Vitesse' ? 's' : '%'}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.value >= metric.target ? 'bg-primary' : 'bg-yellow-500'
                      }`}
                      style={{
                        width: `${Math.min((metric.value / metric.target) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Objectif: {metric.target}{metric.metric === 'Satisfaction' ? '/5' : metric.metric === 'Vitesse' ? 's' : '%'}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Rate Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Taux de Réussite</CardTitle>
          <CardDescription>
            Évolution du taux de réussite des analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyAnalyses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                formatter={(value, name) => [
                  `${((value as number) / dailyAnalyses.find(d => d.date === value)?.analyses * 100).toFixed(1)}%`,
                  'Taux de réussite'
                ]}
              />
              <Area
                type="monotone"
                dataKey={(entry) => (entry.success / entry.analyses) * 100}
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
