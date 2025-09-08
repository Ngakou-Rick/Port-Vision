import LoginForm from "@/components/auth/login-form";
import { Ship, Waves } from "lucide-react";

export default function LoginPage() {
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
          <Ship className="h-20 w-20 text-white/30" />
        </div>
        <div className="absolute bottom-32 right-1/3">
          <Waves className="h-16 w-16 text-white/30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
              Solution de reconnaissance d'images portuaire
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

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
