function formatInUSCurrency(offer) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(offer);
}

export { formatInUSCurrency };
