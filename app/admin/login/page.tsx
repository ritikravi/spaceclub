"use client";
// Admin login is handled directly in /admin/page.tsx with password
// This page just redirects to admin
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin"); }, [router]);
  return null;
}
