"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/AuthContext";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';

import React from "react";
import Swal from 'sweetalert2';
import Image from 'next/image'
import Link from "next/link";

interface HeaderProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

export default function header({ menuOpen, setMenuOpen }: HeaderProps) {

    const router = useRouter();
    const { user, logout } = useAuth();

    const firstName = user?.firstName || '';
    const lastName = user?.lastName || '';
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : user?.username || 'User';

    const handleLogout = async () => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure you want to log out?",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "Keep me logged in"
        }).then(async (result) => {

            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logging out...',
                    timer: 3000,
                    didOpen: async () => {
                        Swal.showLoading();
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false
                }).then(async (result) => {
                    // Clear the session and cookie
                    await logout();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully logged out!',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        confirmButtonText: "OK",
                    }).then(() => {
                        // Clear browser history state to prevent back button access
                        if (window.history && window.history.pushState) {
                            window.history.pushState(null, '', '/login');
                            window.history.replaceState(null, '', '/login');
                        }
                    })
                })
            }
        })
    }

    
    // Menu items for the profile dropdown
    const profileMenuItems: MenuProps["items"] = [
        {
        key: "label",
        disabled: true,
        // Using a custom header label
        label: (
            <div className="small text-secondary">
            Signed in as <strong>{fullName}</strong>
            </div>
        ),
        },
        { type: "divider" },
        { key: "profile", label: "Profile", icon: <UserOutlined />},
        { key: "settings", label: "Settings", icon: <SettingOutlined />},
        { type: "divider" },
        { key: "logout", label: <span className="text-danger">Log out</span>},
    ];

    // Handle dropdown item clicks
    const onProfileMenuClick: MenuProps["onClick"] = async (info) => {
        switch (info.key) {
        case "profile":
            router.push("/dashboard/profile");
            break;
        case "settings":
            router.push("/dashboard/settings");
            break;
        case "logout":
            await handleLogout();
            break;
        default:
            break;
        }
    };


    return (
        <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between p-3 background-color-header">

                <div className="d-flex align-items-center justify-content-center">

                    {/* <a className={`text-dark text-decoration-none p-1 me-3 menu-button ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}> */}
                    <a className={`text-dark text-decoration-none p-1 mx-3 ms-2 menu-button ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <i className={`d-flex bi ${menuOpen ? "bi-x" : "bi-list"} text-white fs-3`} />
                    </a>
                    
                    <div className="d-flex align-items-center ms-2">
                        <Image className="me-3" src="/images/jpph_logo.png" alt="Example Logo" width={40} height={40}></Image>
                        <h5 className="text-white medium p-0, m-0"><strong>Dashboard Demo</strong></h5>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <Dropdown trigger={["click"]} placement="bottom" menu={{ items: profileMenuItems, onClick: onProfileMenuClick }}>
                        {/* Anchor wrapper required by AntD; prevent default navigation */}
                        <a className="text-dark text-decoration-none p-2 icon-link" onClick={(e) => e.preventDefault()}>
                        <Space>
                            <i className="d-flex bi bi-person-fill text-white fs-5" />
                        </Space>
                        </a>
                    </Dropdown>
                    <span className="text-white ms-2"><strong>{fullName}</strong></span>
                </div>
                

            </div>
        </div>
    )
}