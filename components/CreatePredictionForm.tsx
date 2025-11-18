"use client";

import {useEffect, useMemo, useState} from "react";
import {toast} from "sonner";
import {prepareContractCall, readContract} from "thirdweb";
import {useActiveAccount, useSendTransaction} from "thirdweb/react";
import {CRYPTO_FEEDS} from "@/data/cryptoFeeds";
import {predictionMarketContract} from "@/lib/thirdwebClient";

const CATEGORY_OPTIONS = [
  {
    value: "crypto",
    label: "Crypto Predictions",
    description: "Markets tied to supported Chainlink/Pyth trading pairs."
  },
  {
    value: "sports",
    label: "Sports Predictions",
    description: "Score-based outcomes powered by community oracles."
  }
] as const;

const DEFAULT_DIRECTION: Comparator = "ABOVE";

type Comparator = "ABOVE" | "BELOW";

interface Props {
  onSuccess?: () => void;
}

export function CreatePredictionForm({onSuccess}: Props) {
  const account = useActiveAccount();
  const {mutateAsync: sendTransaction, isPending} = useSendTransaction();
  const [ownerAddress, setOwnerAddress] = useState<string>("");

  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]["value"]>("crypto");
  const [pair, setPair] = useState(CRYPTO_FEEDS[0]?.pair ?? "");
  const [direction, setDirection] = useState<Comparator>(DEFAULT_DIRECTION);
  const [targetPrice, setTargetPrice] = useState("1000");
  const [deadline, setDeadline] = useState(defaultDeadline());
  const [customQuestion, setCustomQuestion] = useState("");
  const [daoName, setDaoName] = useState("");
  const [daoAddress, setDaoAddress] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const isOwner =
    ownerAddress && account?.address ? ownerAddress.toLowerCase() === account.address.toLowerCase() : false;

  useEffect(() => {
    if (!predictionMarketContract) return;
    readContract({
      contract: predictionMarketContract,
      method: "function owner() view returns (address)"
    })
      .then((owner) => setOwnerAddress((owner as string) ?? ""))
      .catch(() => setOwnerAddress(""));
  }, []);

  const deadlineLabel = useMemo(() => {
    if (!deadline) return "";
    const date = new Date(deadline);
    return date.toLocaleString();
  }, [deadline]);

  const previewQuestion = useMemo(() => {
    if (category === "crypto") {
      if (!pair || !targetPrice || !deadline) return "";
      const comparatorText = direction === "ABOVE" ? "above" : "below";
      const price = Number(targetPrice);
      if (!Number.isFinite(price)) return "";
      const base = `Will ${pair} close ${comparatorText} $${price.toLocaleString()} by ${deadlineLabel}?`;
      const daoInfo = formatDaoSuffix(daoName, daoAddress);
      return daoInfo ? `${base} DAO focus: ${daoInfo}` : base;
    }
    return customQuestion.trim();
  }, [category, pair, targetPrice, deadline, deadlineLabel, direction, customQuestion, daoName, daoAddress]);

  const handleSubmit = async () => {
    if (!predictionMarketContract || !isOwner) {
      toast.error("Only the protocol owner can create new markets.");
      return;
    }

    if (!previewQuestion) {
      toast.error("Provide a valid market question.");
      return;
    }

    const deadlineSeconds = parseDeadline(deadline);
    if (!deadlineSeconds) {
      toast.error("Deadline must be a valid future date/time.");
      return;
    }

    if (category === "crypto" && !CRYPTO_FEEDS.some((feed) => feed.pair === pair)) {
      toast.error("Selected pair is not supported by the oracle policy.");
      return;
    }

    try {
      const normalizedCategory = category === "crypto" ? "Crypto" : "Sports";
      const tx = prepareContractCall({
        contract: predictionMarketContract,
        method: "function createMarket(string title,string category,uint256 deadline)",
        params: [previewQuestion, normalizedCategory, deadlineSeconds]
      });
      setSubmitting(true);
      await sendTransaction(tx);
      toast.success("Prediction published to the contract");
      if (onSuccess) onSuccess();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create market. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setPair(CRYPTO_FEEDS[0]?.pair ?? "");
    setTargetPrice("1000");
    setDirection(DEFAULT_DIRECTION);
    setDeadline(defaultDeadline());
    setCustomQuestion("");
    setDaoName("");
    setDaoAddress("");
  };

  return (
    <div className="glass-panel space-y-4 p-6">
      <header>
        <p className="card-title">Launch a prediction</p>
        <p className="text-sm text-slate-400">
          Every market is backed by verified oracle feeds and channels a portion of losses into DAO treasuries.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setCategory(option.value)}
            className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
              category === option.value ? "border-brand bg-brand/10 text-white" : "border-white/10 text-slate-400"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">
        {CATEGORY_OPTIONS.find((opt) => opt.value === category)?.description}
      </p>

      {category === "crypto" ? (
        <>
          <label className="block text-sm text-slate-300">
            Supported pair
            <select
              value={pair}
              onChange={(event) => setPair(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
            >
              {CRYPTO_FEEDS.map((feed) => (
                <option key={feed.pair} value={feed.pair}>
                  {feed.pair}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Threshold Price (USD)
              <input
                type="number"
                min="0"
                value={targetPrice}
                onChange={(event) => setTargetPrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
              />
            </label>

            <label className="text-sm text-slate-300">
              Direction
              <select
                value={direction}
                onChange={(event) => setDirection(event.target.value as Comparator)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
              >
                <option value="ABOVE">Will settle above</option>
                <option value="BELOW">Will settle below</option>
              </select>
            </label>
          </div>
        </>
      ) : (
        <label className="block text-sm text-slate-300">
          Prediction question
          <textarea
            value={customQuestion}
            onChange={(event) => setCustomQuestion(event.target.value)}
            rows={3}
            placeholder="Will Team A defeat Team B in the finals?"
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
          />
        </label>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-slate-300">
          Resolution deadline
          <input
            type="datetime-local"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
          />
        </label>

        <label className="text-sm text-slate-300">
          Partner DAO (name)
          <input
            type="text"
            value={daoName}
            onChange={(event) => setDaoName(event.target.value)}
            placeholder="Regenerative Earth DAO"
            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
          />
        </label>
      </div>

      <label className="block text-sm text-slate-300">
        Partner DAO (address)
        <input
          type="text"
          value={daoAddress}
          onChange={(event) => setDaoAddress(event.target.value)}
          placeholder="0x..."
          className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 p-2"
        />
      </label>

      <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-3 text-sm text-slate-300">
        <p className="font-semibold text-white">Question preview</p>
        <p className="mt-1 text-sm text-slate-300">{previewQuestion || "Complete the fields to generate a prompt."}</p>
      </div>

      <button
        type="button"
        disabled={!isOwner || isSubmitting || isPending || !predictionMarketContract}
        onClick={handleSubmit}
        className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-dark disabled:opacity-50"
      >
        {isSubmitting || isPending ? "Publishing..." : isOwner ? "Create prediction" : "Owner wallet required"}
      </button>

      {!account && <p className="text-center text-xs text-slate-400">Connect your wallet to begin.</p>}
      {account && !isOwner && (
        <p className="text-center text-xs text-slate-400">Only the protocol owner can create official predictions.</p>
      )}
    </div>
  );
}

function defaultDeadline() {
  const date = new Date(Date.now() + 72 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 16);
}

function parseDeadline(value: string): bigint | null {
  if (!value) return null;
  const timestamp = Math.floor(new Date(value).getTime() / 1000);
  if (!Number.isFinite(timestamp) || timestamp <= Date.now() / 1000) {
    return null;
  }
  return BigInt(timestamp);
}

function formatDaoSuffix(name: string, address: string) {
  if (!name && !address) return "";
  if (name && address) return `${name} (${address})`;
  return name || address;
}
