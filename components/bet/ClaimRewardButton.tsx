"use client";

import {prepareContractCall} from "thirdweb";
import {useActiveAccount, useSendTransaction} from "thirdweb/react";
import {toast} from "sonner";
import {predictionMarketContract} from "@/lib/thirdwebClient";

interface Props {
  marketId: number;
  onSuccess?: () => void;
}

export function ClaimRewardButton({marketId, onSuccess}: Props) {
  const account = useActiveAccount();
  const {mutateAsync: sendTransaction, isPending} = useSendTransaction();
  const contract = predictionMarketContract;

  if (!account || !contract) return null;

  const claim = async () => {
    try {
      const tx = prepareContractCall({
        contract,
        method: "function claimReward(uint256 marketId)",
        params: [BigInt(marketId)]
      });
      await sendTransaction(tx);
      toast.success("Reward claimed");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Claim failed");
    }
  };

  return (
    <button
      type="button"
      onClick={claim}
      disabled={isPending}
      className="w-full rounded-2xl border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 disabled:opacity-50"
    >
      {isPending ? "Confirming..." : "Claim reward"}
    </button>
  );
}
