import deleteIcon from "../../public/assets/icon-delete.svg";
import plusIcon from "../../public/assets/icon-plus.svg";

import { useRef, useState } from "react";
import FormCol from "./FormCol";
import FormRow from "./FormRow";
import generateUniqueId from "generate-unique-id";

const initialItem = {
  itemName: "New Item",
  itemQty: 1,
  itemPrice: 0,
  totalPrice: 0,
};

function ItemsList({ items, setItems }) {
  const newItemButton = useRef(null);

  function handleUpdateItems(id, updatedItem) {
    const newItems = items.map((item) => (item.id === id ? updatedItem : item));

    setItems(newItems);
  }

  function handleAddItem() {
    console.log("items", items);

    const newItems = [
      ...items,
      { ...initialItem, id: generateUniqueId({ length: 2 }) },
    ];

    setItems(newItems);

    newItemButton.current.scrollIntoView({ behavior: "smooth" });
  }

  function handleRemoveItem(id) {
    const newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
  }

  return (
    <>
      <h3 className="mt-8 text-lg font-bold capitalize text-skin-baliHai">
        Item list
      </h3>

      <div>
        {items?.map((item) => (
          <ItemRow
            key={item.id}
            currentItem={item}
            id={item.id}
            removeItem={handleRemoveItem}
            updateItems={handleUpdateItems}
          />
        ))}
        <button
          ref={newItemButton}
          onClick={handleAddItem}
          type="button"
          className="transition-colors-1 mt-8 flex w-full items-center justify-center gap-1 rounded-full border-2 border-transparent bg-skin-offWhite py-4 text-xs font-bold capitalize text-skin-baliHai hover:border-skin-purple dark:bg-skin-mirage  "
        >
          <img src={plusIcon} alt="icon plus" />
          Add new item
        </button>
      </div>
    </>
  );
}

export default ItemsList;

function ItemRow({ currentItem, id, removeItem, updateItems }) {
  const [item, setItem] = useState(currentItem);

  function handleItemChange(e, field) {
    let updatedItem;

    switch (field) {
      case "itemPrice": {
        const price = e.target.value.trim().replace(",", ".");

        updatedItem = { ...item, [field]: price };

        updatedItem = {
          ...updatedItem,
          totalPrice: +item.itemQty * +updatedItem[field],
        };
        break;
      }
      case "itemQty": {
        const qty = e.target.value.trim().replace(",", ".");

        updatedItem = { ...item, [field]: qty };

        updatedItem = {
          ...updatedItem,
          totalPrice: +item.itemPrice * +updatedItem[field],
        };
        break;
      }
      case "itemName":
        updatedItem = { ...item, [field]: e.target.value.trim() };
        break;
    }

    setItem(updatedItem);
    updateItems(id, updatedItem);
  }

  const formRow = useRef(null);

  function handleRemoveItem() {
    removeItem(id);

    formRow.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mb-6 last:mb-0" ref={formRow}>
      <FormRow classes={"grid grid-cols-12 mt-4 gap-2"}>
        <FormCol classes={"col-span-10 sm:col-span-5"} label={"Item name"}>
          <input
            className="w-full rounded-md border-2 border-gray-300/50 bg-white px-4 py-3 text-sm font-bold text-skin-black placeholder:text-black/85 dark:border-transparent dark:bg-skin-mirage"
            value={item.itemName}
            type="text"
            onChange={(e) => handleItemChange(e, "itemName")}
          />
        </FormCol>
        <div className="col-span-2 mt-4 flex items-center justify-center  sm:hidden">
          <button onClick={handleRemoveItem} type="button">
            <img className="mt-4 w-4" src={deleteIcon} alt="icon trash" />
          </button>
        </div>
        <FormCol classes={"col-span-4 sm:col-span-2"} label={"Qty"}>
          <input
            className="w-full rounded-md border-2 border-gray-300/50 bg-white px-4 py-3 text-sm font-bold text-skin-black placeholder:text-black/85 dark:border-transparent dark:bg-skin-mirage "
            value={item.itemQty}
            onChange={(e) => handleItemChange(e, "itemQty")}
          />
        </FormCol>
        <FormCol classes={"col-span-4 sm:col-span-2"} label={"Price"}>
          <input
            className="w-full rounded-md border-2 border-gray-300/50 bg-white px-4 py-3 text-sm font-bold text-skin-black placeholder:text-black/85 dark:border-transparent dark:bg-skin-mirage "
            value={item.itemPrice}
            onChange={(e) => handleItemChange(e, "itemPrice")}
          />
        </FormCol>
        <div className="flex justify-around  sm:col-span-3">
          <div className="flex flex-col gap-5">
            <label className="text-xs font-medium capitalize text-gray-400">
              Total
            </label>
            <span className="mb-3 font-bold text-skin-shipCove">
              {item.totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            className="col-span-1 mt-4 hidden items-center justify-center sm:mb-4 sm:flex"
            onClick={handleRemoveItem}
            type="button"
          >
            <img className="mt-4 w-4" src={deleteIcon} alt="icon trash" />
          </button>
        </div>
      </FormRow>
    </div>
  );
}
