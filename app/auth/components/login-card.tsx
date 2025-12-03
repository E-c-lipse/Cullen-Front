"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/app/shared/components/ui/card";
import LoginForm from "./login-form";

export default function LoginCard() {
  return (
    <Card className="w-full max-w-md p-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">
          Bienvenido de nuevo a Cullen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
