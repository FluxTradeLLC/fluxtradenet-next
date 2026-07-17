"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Automated Strategies", href: "/#strategies" },
  { label: "FREE Indicators", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="FluxTrade logo"
            width={48}
            height={48}
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <span className="hidden text-xl font-bold italic tracking-tight sm:block">
            FluxTrade
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-[#39ff14]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="https://fluxtrade.net/signin"
            className="text-sm text-muted transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="https://fluxtrade.net/signup"
            className="btn-primary px-5 py-2 text-sm"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-border p-2 text-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-border bg-black px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base text-muted transition-colors hover:text-[#39ff14]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link
              href="https://fluxtrade.net/signin"
              className="text-base text-muted"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="https://fluxtrade.net/signup"
              className="btn-primary py-3 text-center text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
