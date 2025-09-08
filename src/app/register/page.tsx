import RegisterForm from "@/components/auth/register-form";
import { Ship, Waves, Shield, Users } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Une-vue-panoramiqu.jpg')"
        }}
      />
      
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Additional gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900/50" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10">
          <Ship className="h-32 w-32 text-white/30" />
        </div>
        <div className="absolute top-32 right-20">
          <Waves className="h-24 w-24 text-white/30" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <Shield className="h-20 w-20 text-white/30" />
        </div>
        <div className="absolute bottom-32 right-1/3">
          <Users className="h-16 w-16 text-white/30" />
        </div>
        <div className="absolute top-1/2 left-10">
          <Ship className="h-16 w-16 text-white/30" />
        </div>
        <div className="absolute top-1/3 right-10">
          <Waves className="h-12 w-12 text-white/30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
                <Ship className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Port Scan Dashboard
            </h1>
            <p className="text-white/90 drop-shadow-md">
              Rejoignez notre communauté d'experts portuaires
            </p>
          </div>

          {/* Registration Form */}
          <RegisterForm />

          {/* Benefits Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Sécurité garantie</h3>
              <p className="text-sm text-muted-foreground">
                Vos données sont protégées par des standards de sécurité de niveau bancaire
              </p>
            </div>

            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Support expert</h3>
              <p className="text-sm text-muted-foreground">
                Équipe dédiée pour vous accompagner dans l'utilisation de la plateforme
              </p>
            </div>

            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Ship className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Spécialisé portuaire</h3>
              <p className="text-sm text-muted-foreground">
                Solution conçue spécifiquement pour les défis de l'industrie portuaire
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/70 drop-shadow-sm">
              © 2024 Port Scan Dashboard. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
