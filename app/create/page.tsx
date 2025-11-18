import Link from "next/link";
import {CreatePredictionForm} from "@/components/CreatePredictionForm";
import {SupportedPairsCard} from "@/components/SupportedPairsCard";
import {WalletPanel} from "@/components/WalletPanel";

export default function CreatePredictionPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-widest text-brand-light">Steward Console</p>
        <h1 className="text-4xl font-semibold leading-tight">Launch a mission-aligned prediction</h1>
        <p className="max-w-3xl text-slate-300">
          Only pairs listed on the Chainlink/Pyth policy are accepted. Funds lost on the wrong side refill the AMM and
          DAOs you designate, ensuring every market drives regenerative action.
        </p>
        <Link href="/" className="text-sm text-brand-light underline underline-offset-4">
          Back to markets
        </Link>
      </header>

      <CreatePredictionForm />
      <SupportedPairsCard />
      <WalletPanel />
    </div>
  );
}
