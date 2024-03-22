import { FormatMoney } from "format-money-js";

const fm = new FormatMoney({
  decimals: 2,
});

export function formattedMoney(money) {
  return fm.from(+money, { symbol: "$" }, true).fullAmount;
}
