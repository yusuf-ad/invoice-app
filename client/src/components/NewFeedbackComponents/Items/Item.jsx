import { useEffect, useState } from "react";
import { InvoiceInput } from "../InvoiceInput";

export function Item({ item, setItems }) {
  const [newItem, setNewItem] = useState(item);

  function onChangeFunction(e) {
    const { name, value } = e.target;

    setNewItem((item) => ({ ...item, [name]: value }));
  }

  useEffect(() => {
    if (
      newItem.name !== "Item name" &&
      newItem.name.trim() &&
      newItem.quantity >= 1 &&
      newItem.price > 0
    ) {
      setItems((items) => {
        console.log(items);

        return items.map((oldItem) =>
          oldItem.id === item.id ? { ...newItem } : oldItem
        );
      });
    }
  }, [item.id, newItem, setItems]);

  return (
    <li className="mt-4 flex gap-4 items-center">
      <InvoiceInput
        onChangeFunction={onChangeFunction}
        label={"Item name"}
        name={"name"}
        value={newItem.name}
      />
      <InvoiceInput
        styleContainer={"max-w-24"}
        onChangeFunction={onChangeFunction}
        label={"Qty."}
        name={"quantity"}
        value={newItem.quantity}
      />
      <InvoiceInput
        styleContainer={"max-w-24"}
        onChangeFunction={onChangeFunction}
        label={"Price"}
        name={"price"}
        value={newItem.price}
      />

      <div className="flex-1 self-start flex flex-col">
        <label className=" text-gray-400  text-xs font-medium capitalize ">
          Total
        </label>
        <p className="text-baliHai font-bold text-sm ml-4 mt-6">
          {(newItem.price * newItem.quantity).toFixed(2)}
        </p>
      </div>
      <img
        className="mt-6"
        src="./assets/icon-delete.svg"
        alt="icon thrash bin"
      />
    </li>
  );
}
