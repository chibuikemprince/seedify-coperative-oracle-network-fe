"use client";

import {useEffect, useState} from "react";
import {utils} from "ethers";
import {ammContract} from "@/lib/thirdwebClient";
import {readContract} from "thirdweb";

interface AmmInfo {
  bnbReserve: number;
  aiptReserve: number;
  price: number;
}

export function useAmmInfo() {
  const [info, setInfo] = useState<AmmInfo>({bnbReserve: 0, aiptReserve: 0, price: 0});

  useEffect(() => {
    if (!ammContract) return;
    (async () => {
      try {
        const [reserves, spot] = await Promise.all([
          readContract({
            contract: ammContract,
            method: "function getReserves() view returns (uint256,uint256)"
          }),
          readContract({
            contract: ammContract,
            method: "function getPriceAIPT() view returns (uint256)"
          })
        ]);
        setInfo({
          bnbReserve: Number.parseFloat(utils.formatUnits(reserves[0], 18)),
          aiptReserve: Number.parseFloat(utils.formatUnits(reserves[1], 18)),
          price: Number.parseFloat(utils.formatUnits(spot, 18))
        });
      } catch {
        setInfo({bnbReserve: 0, aiptReserve: 0, price: 0});
      }
    })();
  }, [ammContract]);

  return info;
}
