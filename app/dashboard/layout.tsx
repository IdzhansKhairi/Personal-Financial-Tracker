"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Start with menu closed on mobile, open on desktop
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, status, refreshSession } = useAuth();
  const router = useRouter();

  // Set initial menu state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="d-flex flex-grow-1 responsive-page-height" style={{ marginTop: '72px', overflow: 'hidden' }}>
        {/* Sidebar backdrop for mobile */}
        {menuOpen && typeof window !== 'undefined' && window.innerWidth <= 768 && (
          <div
            className="sidebar-backdrop"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998
            }}
          />
        )}
        <Sidebar isOpen={menuOpen} onMenuClick={() => setMenuOpen(false)} />
        <div className="flex-grow-1 p-3 px-4 background content-wrapper" style={{ height: '100%', overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
 