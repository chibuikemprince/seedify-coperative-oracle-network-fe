"use client";

import {ConnectButton, useActiveAccount, useWalletBalance} from "thirdweb/react";
import {CONTRACTS} from "@/lib/contracts";
import {truncateAddress} from "@/lib/format";
import {SUPPORTED_WALLETS, THIRDWEB_CHAIN, thirdwebClient} from "@/lib/thirdwebClient";

export function WalletPanel() {
  const account = useActiveAccount();
  const {data: nativeBalance} = useWalletBalance({
    client: thirdwebClient,
    chain: THIRDWEB_CHAIN,
    address: account?.address
  });
  const {data: aiptBalance} = useWalletBalance({
    client: thirdwebClient,
    chain: THIRDWEB_CHAIN,
    address: account?.address,
    tokenAddress: CONTRACTS.aipt || undefined
  });

  return (
    <div className="glass-panel space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="card-title">Wallet</p>
          <p className="text-xl font-semibold">{account?.address ? truncateAddress(account.address) : "Not connected"}</p>
        </div>
        <ConnectButton
          client={thirdwebClient}
          wallets={SUPPORTED_WALLETS}
          chains={[THIRDWEB_CHAIN]}
          connectModal={{size: "compact"}}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <BalanceTile label="BNB" value={nativeBalance?.displayValue ?? "0"} symbol={nativeBalance?.symbol ?? "BNB"} />
        <BalanceTile label="AIPT" value={aiptBalance?.displayValue ?? "0"} symbol={aiptBalance?.symbol ?? "AIPT"} />
      </div>
    </div>
  );
}

function BalanceTile({label, value, symbol}: {label: string; value: string; symbol: string}) {
  return (
    <div className="rounded-2xl border border-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold">
        {Number.parseFloat(value).toFixed(3)} <span className="text-sm text-slate-400">{symbol}</span>
      </p>
    </div>
  );
}
