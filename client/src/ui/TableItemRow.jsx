import { formatMoney } from "../utils/formatMoney";

function TableItemRow({ item }) {
  return (
    <tr className="text-sm font-bold">
      <td className="pb-4 capitalize text-skin-black">{item.itemName}</td>
      <td className="pb-4 text-right text-skin-baliHai">{item.itemQty} </td>
      <td className="pb-4 text-right text-skin-baliHai">
        ${formatMoney(item.itemPrice)}
      </td>
      <td className="pb-4 text-right text-skin-black">
        ${formatMoney(item.itemQty * item.itemPrice)}
      </td>
    </tr>
  );
}

export default TableItemRow;
