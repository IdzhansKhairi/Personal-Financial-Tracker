"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./components.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import Swal from 'sweetalert2';
import Image from 'next/image'
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) =>
    pathname === path 
      ? "sidebar-link active" : "sidebar-link";
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          
          {/* Sidebar */}
          <div className="bg-dark p-3" style={{ width: "250px" }}>
            {/* Sidebar Title */}
            <div className="d-flex align-items-center justify-content-center mb-4">
              <Image className="me-2" src="/images/jpph_logo.png" alt="Example Logo" width={40} height={40}></Image>
              <h5 className="text-secondary medium p-0, m-0"><strong>JPPH Registration</strong></h5>
            </div>

            {/* Dashboard */}
              <div className="mb-4">
              <Link href="/dashboard" className={`p-1 ps-2 my-2 ${getLinkClass("/dashboard")}`}>
                <i className="bi bi-speedometer2 me-2"></i>Dashboard
              </Link>
            </div>
            

            {/* Visitor Management Section */}
              <div className="mb-4">
                <h6 className="p-1 ps-2 pb-0 mb-0 text-secondary">Visitor Management</h6>
                  <Link href="/dashboard/registration" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/registration")}`}>
                    <i className="bi bi-person-check me-2"></i>Registration
                  </Link>
                  <Link href="/dashboard/visitor-list" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/visitor-list")}`}>
                    <i className="bi bi-card-list me-2"></i>Visitor List
                  </Link>
              </div>

            {/* Admin Section */}
              <div className="mb-4">
                <h6 className="p-1 ps-2 pb-0 mb-0 text-secondary">Managerial</h6>
                  <Link href="/dashboard/security-list" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/security-list")}`}>
                    <i className="bi bi-person-lines-fill me-2"></i>Security List
                  </Link>
                  <Link href="/dashboard/report" className={`p-1 ps-2 my-1 ${getLinkClass("/dashboard/report")}`}>
                    <i className="bi bi-file-earmark-text me-2"></i>Report
                  </Link>
              </div>            
          </div>

        </div>
    </div>
  );
}
