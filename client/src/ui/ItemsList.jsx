import { useRef, useState } from "react";
import FormCol from "./FormCol";
import FormInput from "./FormInput";
import FormRow from "./FormRow";
import generateUniqueId from "generate-unique-id";

const initialItem = {
  itemName: "New Item",
  itemQty: 1,
  itemPrice: 0,
};

function ItemsList({ register, errors, watch, getValues }) {
  const [items, setItems] = useState([
    { ...initialItem, id: generateUniqueId({ length: 2 }) },
  ]);

  const itemsContainer = useRef(null);

  function handleAddItem() {
    const newItems = [
      ...items,
      { ...initialItem, id: generateUniqueId({ length: 2 }) },
    ];

    setItems(newItems);

    itemsContainer.current.scrollIntoView({ behavior: "smooth" });
  }

  function handleRemoveItem(id) {
    const newItems = items.filter((item) => item.id !== id);

    delete getValues("items")[`item${id}`];

    setItems(newItems);
  }

  return (
    <div ref={itemsContainer}>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          watch={watch}
          errors={errors}
          register={register}
          id={item.id}
          removeItem={handleRemoveItem}
        />
      ))}

      <button
        onClick={handleAddItem}
        type="button"
        className="transition-colors-1 mt-8 flex w-full items-center justify-center gap-1 rounded-full bg-gray-200/35 py-4 text-xs font-bold capitalize text-shipCove hover:bg-selago"
      >
        <img src="./assets/icon-plus.svg" alt="icon plus" />
        Add new item
      </button>
    </div>
  );
}

export default ItemsList;

function ItemRow({ errors, register, watch, id, removeItem }) {
  const itemQty = watch(`items.item${id}.itemQty`)?.replace(",", ".");
  const itemPrice = watch(`items.item${id}.itemPrice`)?.replace(",", ".");

  const total = +itemQty * +itemPrice || 0;

  const formRow = useRef(null);

  function handleRemoveItem() {
    removeItem(id);

    formRow.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div ref={formRow}>
      <FormRow classes={"mt-4 gap-4"}>
        <FormCol label={"Item name"} error={errors?.itemName}>
          <FormInput
            register={register}
            name={`items.item${id}.itemName`}
            defaultValue="New Item"
          />
        </FormCol>
        <FormCol classes={"w-24"} label={"Qty"}>
          <FormInput
            register={register}
            name={`items.item${id}.itemQty`}
            defaultValue={1}
          />
        </FormCol>
        <FormCol classes={"w-24"} label={"Price"}>
          <FormInput
            register={register}
            name={`items.item${id}.itemPrice`}
            defaultValue={0}
          />
        </FormCol>
        <div className="flex flex-1 justify-around  gap-6">
          <div className="flex flex-col gap-5">
            <label className="text-xs font-medium capitalize text-gray-400">
              Total
            </label>
            <span className="mb-3 font-bold text-shipCove">
              {total.toFixed(2)}
            </span>
          </div>
          <button onClick={handleRemoveItem} type="button">
            <img
              className="w-4"
              src="./assets/icon-delete.svg"
              alt="icon trash"
            />
          </button>
        </div>
      </FormRow>
    </div>
  );
}
