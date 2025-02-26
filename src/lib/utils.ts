import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MoneyFormatterParams {
  language: string;
  currency: string;
  value: string | number;
}

export const numberToCurrencyAdapter = ({
  language,
  currency,
  value,
}: MoneyFormatterParams) =>
  Intl.NumberFormat(language, {
    currency: currency,
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));

export const numberToBRL = (value: string | number) =>
  numberToCurrencyAdapter({ language: "pt-BR", currency: "BRL", value });
