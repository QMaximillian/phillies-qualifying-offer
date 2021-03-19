function formatInUSCurrency(offer) {
  if (offer === 0) return "Unknown";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(offer);
}

export { formatInUSCurrency };
