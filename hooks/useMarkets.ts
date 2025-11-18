"use client";

import {useCallback, useEffect, useState} from "react";
import {utils} from "ethers";
import {readContract} from "thirdweb";
import {predictionMarketContract} from "@/lib/thirdwebClient";

export interface UiMarket {
  id: number;
  title: string;
  category: string;
  deadline: number;
  yesPool: number;
  noPool: number;
  rewardPool: number;
  closed: boolean;
  resolved: boolean;
  result: boolean;
  resolver: string;
  proof: string;
}

const toBigInt = (value: unknown) => {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(Math.trunc(value));
  if (typeof value === "string") return BigInt(value);
  if (value && typeof value === "object" && "toString" in value) {
    return BigInt((value as {toString(): string}).toString());
  }
  return 0n;
};

const formatEther = (value: unknown) => Number.parseFloat(utils.formatUnits(toBigInt(value), 18));

export function useMarkets() {
  const [markets, setMarkets] = useState<UiMarket[]>([]);
  const [isLoading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!predictionMarketContract) {
      setMarkets([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const total = await readContract({
        contract: predictionMarketContract!,
        method: "function nextMarketId() view returns (uint256)"
      });
      const count = Number(total);
      if (!Number.isFinite(count) || count === 0) {
        setMarkets([]);
        setLoading(false);
        return;
      }

      const ids = Array.from({length: count}, (_, idx) => idx);
      const payload = await Promise.all(
        ids.map(async (id) => {
          const result = await readContract({
            contract: predictionMarketContract!,
            method:
              "function getMarket(uint256 marketId) view returns ((uint256 id,string title,string category,uint256 deadline,uint256 yesPool,uint256 noPool,uint256 rewardPool,bool closed,bool resolved,bool result,string latestOracleProof,address resolver) market,uint256 betCount)",
            params: [BigInt(id)]
          });
          const marketStruct =
            (result as any)?.market ?? (Array.isArray(result) ? (result[0] as any) : (result as any));

          const formatted = {
            id,
            title: marketStruct.title as string,
            category: marketStruct.category as string,
            deadline: Number(toBigInt(marketStruct.deadline)),
            yesPool: formatEther(marketStruct.yesPool),
            noPool: formatEther(marketStruct.noPool),
            rewardPool: formatEther(marketStruct.rewardPool),
            closed: marketStruct.closed as boolean,
            resolved: marketStruct.resolved as boolean,
            result: marketStruct.result as boolean,
            resolver: marketStruct.resolver as string,
            proof: marketStruct.latestOracleProof as string
          } satisfies UiMarket;
          console.log("[Market]", formatted);
          return formatted;
        })
      );
      setMarkets(payload.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error(error);
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }, [predictionMarketContract]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    markets,
    refresh,
    isLoading
  };
}
