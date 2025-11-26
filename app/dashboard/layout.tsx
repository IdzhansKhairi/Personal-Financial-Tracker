"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const { user, status, refreshSession } = useAuth();
  const router = useRouter();

  // Session validation on mount and visibility change
  useEffect(() => {
    const checkSession = async () => {
      if (status === "unauthenticated") {
        // User is not authenticated, redirect to login
        router.replace("/login");
      }
    };

    // Check session on mount
    checkSession();

    // Check session when user returns to the tab (e.g., after pressing back button)
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        await refreshSession();
        checkSession();
      }
    };

    // Check session when page gains focus
    const handleFocus = async () => {
      await refreshSession();
      checkSession();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [status, router, refreshSession]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <div className="position-fixed top-0 start-0 end-0" style={{ zIndex: 1030 }}>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div className="d-flex flex-grow-1" style={{ marginTop: '72px', overflow: 'hidden' }}>
        <Sidebar isOpen={menuOpen} />
        <div className="flex-grow-1 p-3 px-4 background" style={{ height: '100%', overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
 