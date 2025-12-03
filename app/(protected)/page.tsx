"use client";

import { useAuthGuard } from "./../auth/hooks/use-auth-guard";
import Dashboard from "./../components/dashboard";

export default function Home() {
  const { user, loading } = useAuthGuard();
  
  if (loading) return <div>Loading...</div>;

  return <Dashboard />;
}
