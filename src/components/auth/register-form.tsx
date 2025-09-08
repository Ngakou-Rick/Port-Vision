"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = "Le nom de l'entreprise est requis";
    }

    // Position validation
    if (!formData.position.trim()) {
      newErrors.position = "Le poste est requis";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Registration attempt:", formData);
      // Here you would typically make an API call to your registration endpoint
      // For now, we'll just log the data
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jean"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.firstName}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Dupont"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.lastName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jean.dupont@entreprise.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nom de l'entreprise *</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Port de Marseille"
                value={formData.company}
                onChange={handleInputChange}
                className={errors.company ? "border-destructive" : ""}
              />
              {errors.company && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.company}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Poste *</Label>
              <Input
                id="position"
                name="position"
                type="text"
                placeholder="Responsable sécurité"
                value={formData.position}
                onChange={handleInputChange}
                className={errors.position ? "border-destructive" : ""}
              />
              {errors.position && (
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.position}</span>
                </div>
              )}
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-destructive pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2 pt-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded ${
                        level <= passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-destructive"
                            : passwordStrength <= 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.confirmPassword}</span>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2 pt-2">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-muted-foreground rounded"
            />
            <div className="text-sm">
              <Label htmlFor="acceptTerms" className="cursor-pointer font-normal">
                J'accepte les{" "}
                <Button variant="link" className="p-0 h-auto text-sm font-medium">
                  conditions d'utilisation
                </Button>{" "}
                et la{" "}
                <Button variant="link" className="p-0 h-auto text-sm font-medium">
                  politique de confidentialité
                </Button>{" "}
                *
              </Label>
              {errors.acceptTerms && (
                <div className="flex items-center gap-1 text-sm text-destructive mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.acceptTerms}</span>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Création du compte..." : "Créer mon compte"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Button variant="link" className="p-0 h-auto text-sm font-medium" asChild>
              <a href="/login">Se connecter</a>
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
