import { formattedMoney } from "../../utils/formatMoney";

export function TableItem({ item }) {
  return (
    <tr className="font-bold text-sm">
      <td className="pb-4 text-black capitalize">{item.name}</td>
      <td className="pb-4 text-shipCove text-right">{item.quantity} </td>
      <td className="pb-4 text-shipCove text-right">
        ${formattedMoney(item.price)}
      </td>
      <td className="pb-4 text-right">
        ${formattedMoney(item.quantity * item.price)}
      </td>
    </tr>
  );
}
