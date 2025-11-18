"use client";

import {useState} from "react";
import {utils} from "ethers";
import {toast} from "sonner";
import {prepareContractCall} from "thirdweb";
import {useActiveAccount, useSendTransaction} from "thirdweb/react";
import {UiMarket} from "@/hooks/useMarkets";
import {ZERO_ADDRESS, type Address} from "@/lib/contracts";
import {predictionMarketContract} from "@/lib/thirdwebClient";

interface Props {
  market: UiMarket;
  onSuccess?: () => void;
}

export function BetForm({market, onSuccess}: Props) {
  const account = useActiveAccount();
  const {mutateAsync: sendTransaction, isPending} = useSendTransaction();
  const [choice, setChoice] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState("0.1");
  const [dao, setDao] = useState("");
  const [daoPercent, setDaoPercent] = useState(1);
  const disabled = !account || !predictionMarketContract || market.resolved || market.closed;

  const submit = async () => {
    if (disabled) return;
    try {
      const daoInput = dao.trim();
      const daoAddress: Address = daoInput && daoInput.startsWith("0x") ? (daoInput as Address) : ZERO_ADDRESS;
      const daoBps = Math.min(1000, Math.max(0, Math.round(Number(daoPercent) * 100)));
      const tx = prepareContractCall({
        contract: predictionMarketContract!,
        method: "function placeBet(uint256 marketId,bool choice,address dao,uint16 daoPercent) payable",
        params: [BigInt(market.id), choice === "yes", daoAddress, daoBps],
        value: BigInt(utils.parseEther(amount && Number(amount) > 0 ? amount : "0").toString())
      });
      await sendTransaction(tx);
      toast.success("Bet submitted!");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Bet failed. See console.");
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 p-4">
      <div className="flex flex-wrap gap-3">
        <ChoiceButton label="Yes" active={choice === "yes"} onClick={() => setChoice("yes")} color="bg-emerald-500/20" />
        <ChoiceButton label="No" active={choice === "no"} onClick={() => setChoice("no")} color="bg-rose-500/20" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-slate-300">
          Amount (BNB)
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
          />
        </label>
        <label className="text-sm text-slate-300">
          DAO Impact (0-10%)
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={daoPercent}
            onChange={(e) => setDaoPercent(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
          />
        </label>
      </div>

      <label className="mt-3 block text-sm text-slate-300">
        DAO Address (optional)
        <input
          type="text"
          value={dao}
          onChange={(e) => setDao(e.target.value)}
          placeholder="0x..."
          className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
        />
      </label>

      <button
        type="button"
        disabled={disabled || isPending}
        onClick={submit}
        className="mt-4 w-full rounded-2xl bg-brand px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-dark disabled:opacity-50"
      >
        {isPending ? "Confirm in wallet..." : "Place Bet"}
      </button>
      {!account && <p className="mt-2 text-center text-xs text-slate-400">Connect wallet to bet</p>}
    </div>
  );
}

function ChoiceButton({
  label,
  active,
  onClick,
  color
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-2xl border px-3 py-2 text-sm font-semibold transition ${
        active ? `border-brand text-white ${color}` : "border-white/10 text-slate-400"
      }`}
    >
      {label}
    </button>
  );
}
