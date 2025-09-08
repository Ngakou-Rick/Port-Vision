"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Search, Container } from "lucide-react";

interface ContainerInputProps {
  onContainerSearch: (containerNumber: string) => void;
  onAnalysisComplete: (results: any) => void;
}

export default function ContainerInput({ onContainerSearch, onAnalysisComplete }: ContainerInputProps) {
  const [containerNumber, setContainerNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);

  const validateContainerNumber = (number: string) => {
    // Basic container number validation (ISO 6346 format)
    const containerRegex = /^[A-Z]{4}\d{7}$/;
    return containerRegex.test(number);
  };

  const handleSearch = async () => {
    if (!containerNumber.trim()) {
      setError("Veuillez saisir un numéro de conteneur");
      return;
    }

    if (!validateContainerNumber(containerNumber.toUpperCase())) {
      setError("Format de numéro de conteneur invalide (ex: ABCD1234567)");
      return;
    }

    setError("");
    setIsSearching(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock search results
      const mockResults = {
        containerNumber: containerNumber.toUpperCase(),
        status: "En transit",
        location: "Terminal 3 - Zone A",
        lastUpdate: new Date().toISOString(),
        dimensions: "20' x 8' x 8.5'",
        weight: "24,500 kg",
        contents: [
          { type: "Machinerie industrielle", confidence: 0.92 },
          { type: "Équipements électroniques", confidence: 0.87 },
          { type: "Matériaux de construction", confidence: 0.75 }
        ],
        securityStatus: "Sécurisé",
        customsStatus: "Déclaré",
        estimatedArrival: "2024-01-15T14:30:00Z"
      };

      setSearchResults(mockResults);
      onContainerSearch(containerNumber.toUpperCase());
      onAnalysisComplete(mockResults);
    } catch (error) {
      console.error("Search error:", error);
      setError("Erreur lors de la recherche du conteneur");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setContainerNumber("");
    setSearchResults(null);
    setError("");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-2">
            <Label htmlFor="containerNumber" className="text-base">Numéro de conteneur</Label>
            <div className="flex gap-2">
              <Input
                id="containerNumber"
                placeholder="Ex: ABCD1234567"
                value={containerNumber}
                onChange={(e) => {
                  setContainerNumber(e.target.value.toUpperCase());
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                className={error ? "border-destructive" : ""}
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !containerNumber.trim()}
                className="px-6"
              >
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            {error && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Format attendu: 4 lettres suivies de 7 chiffres (ex: ABCD1234567)
          </p>
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between mb-6">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Résultats pour {searchResults.containerNumber}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={clearSearch}>
                Nouvelle recherche
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Basic Information */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-semibold text-lg">Informations générales</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statut:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {searchResults.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Localisation:</span>
                    <span className="text-right font-medium">{searchResults.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">{searchResults.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Poids:</span>
                    <span className="font-medium">{searchResults.weight}</span>
                  </div>
                </div>
              </div>

              {/* Security & Customs */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-semibold text-lg">Sécurité & Douanes</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statut sécurité:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      {searchResults.securityStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statut douanes:</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {searchResults.customsStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrivée estimée:</span>
                    <span className="text-right font-medium">
                      {new Date(searchResults.estimatedArrival).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dernière màj:</span>
                    <span className="text-right font-medium">
                      {new Date(searchResults.lastUpdate).toLocaleString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contents Analysis */}
              <div className="md:col-span-2 mt-4 p-4 border rounded-lg">
                <h4 className="font-semibold text-lg mb-4">Contenu détecté</h4>
                <div className="space-y-2">
                  {searchResults.contents.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{item.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {Math.round(item.confidence * 100)}%
                        </span>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
