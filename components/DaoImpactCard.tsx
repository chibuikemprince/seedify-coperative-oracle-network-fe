"use client";

import {daoPartners} from "@/data/daoPartners";
import {BarChart3} from "lucide-react";

export function DaoImpactCard() {
  return (
    <div className="glass-panel space-y-4 p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-brand-light" />
        <div>
          <p className="card-title">DAO Impact</p>
          <p className="text-lg font-semibold">Community allocations</p>
        </div>
      </div>

      <ul className="space-y-3">
        {daoPartners.map((dao) => (
          <li key={dao.name} className="rounded-2xl border border-white/5 p-3">
            <p className="text-sm font-semibold">{dao.name}</p>
            <p className="text-xs text-slate-400">{dao.impact}</p>
            <p className="mt-1 text-sm text-brand-light">{dao.aipt.toLocaleString()} AIPT</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
