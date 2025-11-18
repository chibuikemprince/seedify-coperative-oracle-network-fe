"use client";

import Link from "next/link";
import {DaoImpactCard} from "@/components/DaoImpactCard";
import {SupportedPairsCard} from "@/components/SupportedPairsCard";
import {WalletPanel} from "@/components/WalletPanel";

export default function DaoPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-brand-light">DAO Impact Ledger</p>
        <h1 className="text-4xl font-semibold leading-tight">See how prediction flows fund communities</h1>
        <p className="max-w-3xl text-slate-300">
          Each market can earmark a DAO address so portions of winning payouts are swapped into AIPT and streamed to your
          mission. Track allocations and share proof with your supporters.
        </p>
        <Link href="/" className="text-sm text-brand-light underline underline-offset-4">
          Explore markets
        </Link>
      </header>

      <DaoImpactCard />
      <SupportedPairsCard />
      <WalletPanel />
    </div>
  );
}
