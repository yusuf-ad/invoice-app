import FormCol from "./FormCol";
import FormInput from "./FormInput";
import FormRow from "./FormRow";

function ItemsList({ register, errors, watch }) {
  return (
    <div>
      <ItemRow watch={watch} errors={errors} register={register} id={1} />
      <ItemRow watch={watch} errors={errors} register={register} id={2} />
      <ItemRow watch={watch} errors={errors} register={register} id={3} />

      <button
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

function ItemRow({ errors, register, watch, id }) {
  const itemQty = watch(`item${id}.itemQty`)?.replace(",", ".");
  const itemPrice = watch(`item${id}.itemPrice`)?.replace(",", ".");

  const total = +itemQty * +itemPrice;

  return (
    <FormRow classes={"mt-4 gap-4"}>
      <FormCol label={"Item name"} error={errors?.itemName}>
        <FormInput
          register={register}
          name={`item${id}.itemName`}
          defaultValue="New Item"
        />
      </FormCol>
      <FormCol classes={"w-24"} label={"Qty"}>
        <FormInput
          register={register}
          name={`item${id}.itemQty`}
          defaultValue={1}
        />
      </FormCol>
      <FormCol classes={"w-24"} label={"Price"}>
        <FormInput
          register={register}
          name={`item${id}.itemPrice`}
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

        <button type="button">
          <img
            className="w-4"
            src="./assets/icon-delete.svg"
            alt="icon trash"
          />
        </button>
      </div>
    </FormRow>
  );
}
