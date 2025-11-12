import type { ReactNode } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />

      <div className="w-100">
        <Header />

        <div className="flex-grow-1 p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
