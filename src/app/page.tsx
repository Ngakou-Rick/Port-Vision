import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Camera, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ship className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Port Scan Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/login">Connexion</a>
              </Button>
              <Button size="sm" asChild>
                <a href="/register">S'inscrire</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Reconnaissance d'Images Portuaire
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Solution intelligente de reconnaissance d'objets pour optimiser les opérations portuaires
            et améliorer la sécurité des conteneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/login">Commencer l'analyse</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <a href="/analytics">Voir les statistiques</a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Upload d'Images</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Glissez-déposez ou sélectionnez vos images pour une analyse instantanée
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Sécurité Avancée</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Authentification sécurisée et protection des données sensibles
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Statistiques détaillées et historique des analyses effectuées
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Ship className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Spécialisé Portuaire</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimisé pour la reconnaissance de conteneurs et objets portuaires
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Prêt à optimiser vos opérations portuaires ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Rejoignez les entreprises qui font confiance à notre solution de reconnaissance d'images
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="/login">Démarrer maintenant</a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Port Scan Dashboard. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}