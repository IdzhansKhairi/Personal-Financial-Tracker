"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import Swal from 'sweetalert2';
import Image from 'next/image'
import Link from "next/link"

export default function header() {

    const router = useRouter();

    const handleLogout = async () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to log out?",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "Keep me logged in"
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                title: 'Logging out...',
                timer: 3000,
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
                }).then(() => {
                    router.push("/login");
                })
            }
            
        })
        
    }

    return (
        <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                <h5 className="p-0 m-0 text-secondary">Hello, Muhammad Idzhans Khairi!</h5>
                <div className="d-flex justify-content-end align-items-center">
                    <a className="text-dark text-decoration-none p-2 me-3 icon-link">
                        <i className="d-flex bi bi-gear"></i>
                    </a>

                    <a className="text-dark text-decoration-none p-2 me-3 icon-link">
                        <i className="d-flex bi bi-person-circle"></i>
                    </a>

                    <a className="text-dark text-decoration-none hover-opacity p-2 icon-link" onClick={(e) => {
                        e.preventDefault;
                        handleLogout()
                    }}>
                        <i className="d-flex bi bi-box-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}