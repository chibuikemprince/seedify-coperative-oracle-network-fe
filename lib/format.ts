import {utils} from "ethers";

export const formatToken = (value?: bigint | string, decimals = 18, precision = 2) => {
  if (value === undefined || value === null) return "0.00";
  try {
    const normalized = typeof value === "string" ? BigInt(value) : value;
    const formatted = Number.parseFloat(utils.formatUnits(normalized, decimals)).toFixed(precision);
    return formatted;
  } catch {
    return "0.00";
  }
};

export const truncateAddress = (address?: string, chars = 4) => {
  if (!address) return "";
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
};

export const formatTimestamp = (value?: bigint) => {
  if (!value) return "-";
  const date = new Date(Number(value) * 1000);
  return date.toLocaleString();
};
