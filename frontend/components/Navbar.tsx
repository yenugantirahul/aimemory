"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Navbar() {
  // Replace with your auth session later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/get-session");
        if (res.status === 200 && res.data) {
          console.log(res.data);
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/sign-out");
      setIsAuthenticated(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted font-semibold text-base">
            A
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">
              AIMemory
            </span>
            <span className="text-xs text-muted-foreground">
              AI Memory Platform
            </span>
          </div>
        </Link>

        {/* Navigation */}
        

        {/* Right */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-muted-foreground mr-2">
                Hi, {user?.name || "User"}!
              </span>
              <Link href="/chat">
                <Button variant="ghost" size="sm" className="rounded-full px-5">
                  Dashboard
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="rounded-full px-5"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer rounded-full px-5"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  size="sm"
                  className="cursor-pointer rounded-full px-6 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
