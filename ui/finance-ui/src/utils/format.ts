export function formatCurrency(
    value: number,
    currency: string
  ) {
    if (value === undefined || value === null) return "-";
  
    const locale =
      currency === "INR"
        ? "en-IN"
        : currency === "USD"
        ? "en-US"
        : currency === "EUR"
        ? "de-DE"
        : "en-US";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  export function formatPercent(value: number) {
    if (value === undefined || value === null)
      return "-";
  
    return `${value.toFixed(2)}%`;
  }
  
  export function formatNumber(
    value: number,
    currency: string
  ) {
    if (value === undefined || value === null) return "-";
  
    const locale =
      currency === "INR"
        ? "en-IN"
        : "en-US";
  
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  