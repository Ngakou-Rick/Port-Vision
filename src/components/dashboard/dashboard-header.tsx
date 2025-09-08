"use client";

import { Button } from "@/components/ui/button";
import { Ship, Bell, User, LogOut, Settings } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export default function DashboardHeader({ userName = "Utilisateur", onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Ship className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Port Scan Dashboard</h1>
              <p className="text-sm text-muted-foreground">Reconnaissance d'images portuaire</p>
            </div>
          </div>

          {/* Navigation and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Analytics Link */}
            <Button variant="ghost" size="sm" asChild>
              <a href="/analytics">Analytics</a>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <User className="h-5 w-5 text-primary" />
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
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
