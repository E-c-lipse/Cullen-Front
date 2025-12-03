"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginCard from "../../components/login-card";
import { useAuth } from "../../contexts/auth-context";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <LoginCard />
    </div>
  );
}
