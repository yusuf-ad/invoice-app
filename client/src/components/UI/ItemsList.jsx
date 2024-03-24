import generateUniqueId from "generate-unique-id";
import FormCol from "./FormCol";
import FormInput from "./FormInput";
import FormRow from "./FormRow";

function ItemsList({ register, errors }) {
  return (
    <div>
      <ItemRow errors={errors} register={register} />
      {/* <ItemRow errors={errors} register={register} /> */}

      <button
        type="button"
        className="mt-8 text-shipCove font-bold text-xs capitalize w-full bg-gray-200/35 rounded-full py-4 flex justify-center items-center gap-1 transition-colors-1 hover:bg-selago"
      >
        <img src="./assets/icon-plus.svg" alt="icon plus" />
        Add new item
      </button>
    </div>
  );
}

export default ItemsList;

function ItemRow({ errors, register }) {
  const item = {
    id: generateUniqueId(),
    itemName: "New Item",
    itemQty: 1,
    itemPrice: 0,
  };

  return (
    <FormRow classes={"mt-4 gap-4"}>
      <FormCol label={"Item name"} error={errors?.itemName}>
        <FormInput
          register={register}
          name={"itemName"}
          defaultValue="New Item"
        />
      </FormCol>
      <FormCol classes={"w-24"} label={"Qty"}>
        <FormInput register={register} name={"itemQty"} defaultValue={1} />
      </FormCol>
      <FormCol classes={"w-24"} label={"Price"}>
        <FormInput register={register} name={"itemPrice"} defaultValue={0} />
      </FormCol>

      <div className="flex justify-around flex-1  gap-6">
        <div className="flex flex-col gap-5">
          <label className="text-gray-400 text-xs font-medium capitalize">
            Total
          </label>
          <span className="mb-3 text-shipCove font-bold">0.00</span>
        </div>

        <button type="button">
          <img
            className="w-5"
            src="./assets/icon-delete.svg"
            alt="icon trash"
          />
        </button>
      </div>
    </FormRow>
  );
}
