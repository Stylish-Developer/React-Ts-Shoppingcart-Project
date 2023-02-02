const CurrencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: "INR",
  style: "currency",
});


export const CurrencyFormat = (number: number) => {
  return CurrencyFormatter.format(number);
};
