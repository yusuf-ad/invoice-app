import { formattedMoney } from "../utils/formatMoney";

export function TableItem({ item }) {
  return (
    <tr className="text-sm font-bold">
      <td className="pb-4 capitalize text-black">{item.name}</td>
      <td className="pb-4 text-right text-shipCove">{item.quantity} </td>
      <td className="pb-4 text-right text-shipCove">
        ${formattedMoney(item.itemPrice)}
      </td>
      <td className="pb-4 text-right">
        ${formattedMoney(item.itemQty * item.itemPrice)}
      </td>
    </tr>
  );
}
