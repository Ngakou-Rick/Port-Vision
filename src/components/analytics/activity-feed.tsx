"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  Container,
  User,
  MoreHorizontal
} from "lucide-react";

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: "image_analysis",
    title: "Analyse d'image terminée",
    description: "Conteneur MSKU1234567 - 3 objets détectés",
    timestamp: "2024-01-15T14:30:00Z",
    status: "success",
    user: "Jean Dupont",
    details: {
      containerNumber: "MSKU1234567",
      objectsDetected: 3,
      confidence: 94.2
    }
  },
  {
    id: 2,
    type: "container_search",
    title: "Recherche de conteneur",
    description: "ABCD9876543 - Statut: En transit",
    timestamp: "2024-01-15T14:15:00Z",
    status: "success",
    user: "Marie Martin",
    details: {
      containerNumber: "ABCD9876543",
      status: "En transit",
      location: "Terminal 2"
    }
  },
  {
    id: 3,
    type: "image_analysis",
    title: "Échec d'analyse d'image",
    description: "Image de mauvaise qualité - Objets non identifiés",
    timestamp: "2024-01-15T13:45:00Z",
    status: "error",
    user: "Pierre Durand",
    details: {
      error: "Image de mauvaise qualité",
      objectsDetected: 0
    }
  },
  {
    id: 4,
    type: "container_search",
    title: "Recherche de conteneur",
    description: "EFGH5555555 - Statut: Sécurisé",
    timestamp: "2024-01-15T13:20:00Z",
    status: "success",
    user: "Sophie Leroy",
    details: {
      containerNumber: "EFGH5555555",
      status: "Sécurisé",
      location: "Zone de stockage A"
    }
  },
  {
    id: 5,
    type: "image_analysis",
    title: "Analyse d'image terminée",
    description: "IJKL7777777 - 5 objets détectés",
    timestamp: "2024-01-15T12:55:00Z",
    status: "success",
    user: "Jean Dupont",
    details: {
      containerNumber: "IJKL7777777",
      objectsDetected: 5,
      confidence: 89.7
    }
  }
];

const activityTypes = [
  { value: "all", label: "Toutes les activités" },
  { value: "image_analysis", label: "Analyses d'images" },
  { value: "container_search", label: "Recherches de conteneurs" },
  { value: "error", label: "Erreurs" }
];

const statusColors = {
  success: "text-green-600 bg-green-500/10",
  error: "text-destructive bg-destructive/10",
  warning: "text-yellow-600 bg-yellow-500/10",
  info: "text-blue-600 bg-blue-500/10"
};

export default function ActivityFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [filteredActivities, setFilteredActivities] = useState(mockActivities);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterActivities(term, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterActivities(searchTerm, type);
  };

  const filterActivities = (search: string, type: string) => {
    let filtered = mockActivities;

    if (type !== "all") {
      if (type === "error") {
        filtered = filtered.filter(activity => activity.status === "error");
      } else {
        filtered = filtered.filter(activity => activity.type === type);
      }
    }

    if (search) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.description.toLowerCase().includes(search.toLowerCase()) ||
        activity.user.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
  };

  const getActivityIcon = (type: string, status: string) => {
    const iconColor = status === "success" ? "text-green-500" : "text-destructive";
    if (type === "image_analysis") {
      return <Camera className={`h-5 w-5 ${iconColor}`} />;
    } else {
      return <Container className={`h-5 w-5 ${iconColor}`} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Il y a quelques minutes";
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours}h`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Flux d'Activités</CardTitle>
            <CardDescription>
              Historique détaillé des analyses et recherches
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans les activités..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {activityTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeFilter(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucune activité trouvée</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type, activity.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {activity.user}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(activity.timestamp)}
                        </div>
                        {activity.details?.confidence && (
                          <div className="flex items-center gap-1">
                            <span>Confiance: {activity.details.confidence}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[activity.status as keyof typeof statusColors]}`}>
                        {activity.status === "success" ? "Succès" : "Erreur"}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredActivities.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              Charger plus d'activités
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
