import LoginForm from "@/components/auth/login-form";
import { Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Ship className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">PortScan</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Bienvenue à nouveau
            </h1>
            <p className="text-muted-foreground">
              Connectez-vous pour accéder à votre tableau de bord.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="/Une-vue-panoramiqu.jpg"
          alt="Vue panoramique d'un port"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h2 className="text-3xl font-semibold">
            "La solution la plus intuitive pour la gestion de nos terminaux."
          </h2>
          <p className="mt-2 text-slate-300">- Chef de la sécurité, Port de Marseille</p>
        </div>
      </div>
    </div>
  );
}
