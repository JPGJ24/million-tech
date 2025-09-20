import { useMemo } from "react";

interface PriceFormatterOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const usePriceFormatter = (options: PriceFormatterOptions = {}) => {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  const formatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }, [currency, locale, minimumFractionDigits, maximumFractionDigits]);

  const formatPrice = (price: number): string => {
    return formatter.format(price);
  };

  const formatPriceWithCommas = (price: number): string => {
    return price.toLocaleString(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    });
  };

  const formatPriceShort = (price: number): string => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  return {
    formatPrice,
    formatPriceWithCommas,
    formatPriceShort,
  };
};
