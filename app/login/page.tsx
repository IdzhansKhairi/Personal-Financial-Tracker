"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => router.push("/dashboard"); // redirect after login

  return (

    <div>

      <div className="d-flex align-items-center justify-content-center mb-4">
        <Image className="me-4" src="/images/jpph_logo.png" alt="Example Logo" width={100} height={100}></Image>
        <h2 className="text-secondary p-0, m-0"><strong>JPPH Registration</strong></h2>
      </div>

      <div className="p-4 border rounded bg-white">
        <h3 className="text-center mb-3">Login</h3>
        <input className="form-control mb-3" placeholder="Username" />
        <input className="form-control mb-3" type="password" placeholder="Password" />
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>

    </div>

  );
}
