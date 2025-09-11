"use client";

import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Settings, BarChart3, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DashboardHeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function DashboardHeader({ userName = "Utilisateur", onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo_douanes.png" alt="Port Vision" width={32} height={32} />
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Tableau de bord
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </Button>
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-secondary rounded-full">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">Administrateur</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onLogout}
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
