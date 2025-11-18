"use client";

export function LoadingState() {
  return (
    <div className="glass-panel flex min-h-[200px] items-center justify-center p-6">
      <div className="animate-pulse text-slate-400">Loading on-chain data…</div>
    </div>
  );
}
