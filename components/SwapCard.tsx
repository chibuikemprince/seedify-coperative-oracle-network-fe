"use client";

import {useMemo, useState} from "react";
import {utils} from "ethers";
import {toast} from "sonner";
import {prepareContractCall} from "thirdweb";
import {useActiveAccount, useSendTransaction} from "thirdweb/react";
import {CONTRACTS} from "@/lib/contracts";
import {ammContract, tokenContract} from "@/lib/thirdwebClient";

export function SwapCard() {
  const [bnbAmount, setBnbAmount] = useState("0.1");
  const [aiptAmount, setAiptAmount] = useState("10");
  const account = useActiveAccount();
  const {mutateAsync: sendTransaction, isPending} = useSendTransaction();
  const userAddress = account?.address as `0x${string}` | undefined;
  const ammAddress = CONTRACTS.amm ? (CONTRACTS.amm as `0x${string}`) : undefined;
  const disabled = !userAddress || !ammContract || !ammAddress;

  const toWei = useMemo(
    () => (value: string) => BigInt(utils.parseEther(value && Number(value) > 0 ? value : "0").toString()),
    []
  );

  const swapBnb = async () => {
    if (disabled) return;
    try {
      const tx = prepareContractCall({
        contract: ammContract!,
        method: "swapBNBForAIPT",
        params: [userAddress!, 0n],
        value: toWei(bnbAmount)
      });
      await sendTransaction(tx);
      toast.success("Swap submitted");
    } catch (error) {
      console.error(error);
      toast.error("Swap failed");
    }
  };

  const swapAipt = async () => {
    if (disabled || !tokenContract) return;
    try {
      const amount = toWei(aiptAmount);
      const approveTx = prepareContractCall({
        contract: tokenContract,
        method: "approve",
        params: [ammAddress!, amount]
      });
      await sendTransaction(approveTx);

      const swapTx = prepareContractCall({
        contract: ammContract!,
        method: "swapAIPTForBNB",
        params: [userAddress!, amount, 0n]
      });
      await sendTransaction(swapTx);
      toast.success("Swap submitted");
    } catch (error) {
      console.error(error);
      toast.error("Swap failed");
    }
  };

  return (
    <div className="glass-panel space-y-4 p-5">
      <div>
        <p className="card-title">AMM Swap</p>
        <p className="text-lg font-semibold">BNB {"<->"} AIPT</p>
      </div>

      <label className="text-sm text-slate-300">
        Spend BNB
        <div className="mt-1 flex gap-2">
          <input
            type="number"
            min="0"
            value={bnbAmount}
            onChange={(e) => setBnbAmount(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 p-2"
          />
          <button
            type="button"
            disabled={disabled || isPending}
            onClick={swapBnb}
            className="rounded-xl bg-brand px-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            Swap
          </button>
        </div>
      </label>

      <label className="text-sm text-slate-300">
        Spend AIPT
        <div className="mt-1 flex gap-2">
          <input
            type="number"
            min="0"
            value={aiptAmount}
            onChange={(e) => setAiptAmount(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 p-2"
          />
          <button
            type="button"
            disabled={disabled || isPending}
            onClick={swapAipt}
            className="rounded-xl bg-slate-800 px-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            Swap
          </button>
        </div>
      </label>

      {!account && <p className="text-xs text-slate-500">Connect wallet to use the AMM</p>}
      {!ammContract && (
        <p className="text-xs text-amber-400">AMM contract address missing. Set NEXT_PUBLIC_AMM_ADDRESS to enable swaps.</p>
      )}
    </div>
  );
}
