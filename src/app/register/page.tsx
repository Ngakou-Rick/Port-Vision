import RegisterForm from "@/components/auth/register-form";
import { Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Ship className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">PortScan</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Créez votre compte
            </h1>
            <p className="text-muted-foreground">
              Rejoignez la plateforme leader pour l'analyse d'images portuaires.
            </p>
          </div>
          <RegisterForm />
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
            "Une efficacité accrue de 20% sur la gestion des conteneurs."
          </h2>
          <p className="mt-2 text-slate-300">- Directeur des Opérations, Port d'Anvers</p>
        </div>
      </div>
    </div>
  );
}
