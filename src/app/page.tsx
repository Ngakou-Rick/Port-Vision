import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, BarChart3, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo_douanes.png" alt="Port Vision" width={40} height={40} />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <a href="/login">Connexion</a>
              </Button>
              <Button asChild>
                <a href="/register">S'inscrire <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image
            src="/Une-vue-panoramiqu.jpg"
            alt="Vue panoramique d'un port"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="z-20 container mx-auto px-4 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              La Vision Augmentée pour vos Opérations Portuaires
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto">
              Optimisez la sécurité et l'efficacité de vos terminaux avec notre solution IA de reconnaissance d'images.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/dashboard">Commencer l'analyse <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8" asChild>
                <a href="#features">Découvrir les fonctionnalités</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 sm:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-foreground">Une Plateforme Complète</h3>
              <p className="text-lg text-muted-foreground mt-2">
                Tout ce dont vous avez besoin pour une gestion portuaire intelligente.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <Camera className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Upload d'Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Analysez vos images en quelques clics via une interface simple et intuitive.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Sécurité Avancée</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Protection de vos données et authentification robuste pour une tranquillité d'esprit.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <BarChart3 className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Analytics Détaillées</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Visualisez les statistiques clés et suivez les performances de vos analyses.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                    <Image src="/logo_douanes.png" alt="Port Vision" width={40} height={40} />
                  </div>
                  <CardTitle className="text-xl">Spécialisé Portuaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Un modèle entraîné pour identifier les conteneurs et équipements spécifiques aux ports.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary">
          <div className="container mx-auto px-4 py-16 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Prêt à transformer vos opérations ?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez les leaders du secteur qui nous font confiance pour la reconnaissance d'images.
            </p>
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/register">Démarrer maintenant <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 PortScan. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}