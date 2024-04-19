import { formattedMoney } from "../utils/formatMoney";

export function TableItem({ item }) {
  return (
    <tr className="text-sm font-bold">
      <td className="text-skin-black pb-4 capitalize">{item.itemName}</td>
      <td className="text-skin-baliHai pb-4 text-right">{item.itemQty} </td>
      <td className="text-skin-baliHai pb-4 text-right">
        ${formattedMoney(item.itemPrice)}
      </td>
      <td className="text-skin-black pb-4 text-right">
        ${formattedMoney(item.itemQty * item.itemPrice)}
      </td>
    </tr>
  );
}
