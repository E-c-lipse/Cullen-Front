"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Don't protect the login route
    if (pathname === "/login") {
      return;
    }

    // Wait for auth to finish loading
    if (loading) {
      return;
    }

    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  // Show loading state while checking authentication
  if (loading && pathname !== "/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
