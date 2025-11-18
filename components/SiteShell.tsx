"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {ConnectButton} from "thirdweb/react";
import {ReactNode} from "react";
import {SUPPORTED_WALLETS, THIRDWEB_CHAIN, thirdwebClient} from "@/lib/thirdwebClient";

const NAV_LINKS = [
  {href: "/", label: "Markets"},
  {href: "/create", label: "Create"},
  {href: "/swap", label: "Swap"},
  {href: "/dao", label: "DAOs"}
] as const;

export function SiteShell({children}: {children: ReactNode}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/5 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-wide text-brand-light">
            Cooperative Oracle Network
          </Link>
          <nav className="hidden gap-4 text-sm font-medium text-slate-300 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 transition ${
                    isActive ? "bg-brand/20 text-white" : "hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ConnectButton
            client={thirdwebClient}
            wallets={SUPPORTED_WALLETS}
            chains={[THIRDWEB_CHAIN]}
            connectModal={{size: "compact"}}
          />
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
}
