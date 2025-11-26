"use client";

import './login.css'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from 'next/image'


export default function LoginPage() {

  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // If there's an error parameter, show unauthorized
  useEffect(() => {
    if(error) router.replace("/unauthorized");
  }, [error, router]);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful - wait a moment for cookie to be set, then redirect
        // Use window.location instead of router.push to ensure fresh page load with new cookie
        window.location.href = "/dashboard";
      } else {
        // Login failed
        setLoginError(data.error || "Invalid username or password");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  }

  return (

    <div>

      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image className="me-4" src="/images/jpph_logo.png" alt="Example Logo" width={100} height={100}></Image>
        <h2 className="text-secondary p-0, m-0"><strong>JPPH Registration</strong></h2>
      </div>

      <div className="p-4 border rounded bg-white">
        <h3 className="text-center mb-3">Login</h3>
        <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && username.trim() && password.trim()) {
              handleLogin();
            }
          }}
        />
        
        <div className="position-relative mb-3 d-flex align-items-center justify-content-end">
          <input className="form-control pe-5" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && username.trim() && password.trim()) {
                handleLogin();
              }
            }}
          />
          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute pe-3 eye-password-icon`} onClick={() => setShowPassword(!showPassword)}></i>
        </div>
        
        
        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={ loading || !username.trim() || !password.trim()}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {loginError && <div className="text-danger mb-2">{loginError}</div>}
      </div>

    </div>

  );
}
