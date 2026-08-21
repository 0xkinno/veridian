"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="capsule-navbar-wrapper">
      <nav className="capsule-navbar">
        <Link href="/" className="brand-wordmark">
          VERIDIAN <span>ASSURANCE</span>
        </Link>

        <ul className="nav-links">
          <li>
            <a href="#product" className="nav-link">
              Product
            </a>
          </li>
          <li>
            <a href="#promise-graph" className="nav-link">
              How it works
            </a>
          </li>
          <li>
            <a href="#evidence" className="nav-link">
              Evidence
            </a>
          </li>
          <li>
            <a href="#release-gate" className="nav-link">
              Release Gate
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href="https://github.com/0xkinno/veridian"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-secondary"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>

          <Link href="/console" className="btn-pill-primary">
            Open Console <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 left-4 right-4 bg-[#0e1318] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 z-50">
          <a href="#product" className="text-gray-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
            Product
          </a>
          <a href="#promise-graph" className="text-gray-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
            How it works
          </a>
          <a href="#evidence" className="text-gray-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
            Evidence
          </a>
          <a href="#release-gate" className="text-gray-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
            Release Gate
          </a>
          <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
            <Link href="/console" className="btn-pill-primary text-center justify-center" onClick={() => setMobileMenuOpen(false)}>
              Open Console ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
