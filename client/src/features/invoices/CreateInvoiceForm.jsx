// React Imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Component Imports
import FormCol from "../../ui/FormCol";
import FormInput from "../../ui/FormInput";
import FormRow from "../../ui/FormRow";
import ItemsList from "../../ui/ItemsList";
import SelectionField from "../../ui/SelectionField";
import SelectDate from "../../ui/SelectDate";

// Utility and Hook Imports
import { millisecondsInADay } from "../../utils/millisecondsInADay";
import { useCreateInvoice } from "./useCreateInvoice";
import Modal, { useModal } from "../../ui/Modal";
import generateUniqueId from "generate-unique-id";

const initialItem = {
  itemName: "New Item",
  itemQty: 1,
  itemPrice: 0,
  totalPrice: 0,
};

function CreateInvoiceForm() {
  // Hooks
  const { close: closeModal } = useModal();
  const { createInvoice, isLoading: isCreating } = useCreateInvoice();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const [paymentDue, setPaymentDue] = useState(
    // initial date is set to tomorrow
    new Date(Date.now() + millisecondsInADay),
  );
  const [items, setItems] = useState([
    { ...initialItem, id: generateUniqueId({ length: 2 }) },
  ]);

  // Function Definitions
  function createNewInvoice(data) {
    const total = items
      .reduce((acc, item) => +acc + +item.totalPrice, 0)
      .toFixed(2);

    const newInvoice = {
      ...data,
      total,
      items,
      paymentTerms: data.paymentTerms ? data.paymentTerms : "Net 1 day",
      paymentDue,
    };

    createInvoice(newInvoice, {
      onSuccess: () => {
        closeModal();
        clearForm();
      },
    });
  }

  function clearForm() {
    reset();
    setPaymentDue(new Date(Date.now() + millisecondsInADay));
    // ! this doesn't work
    setValue("paymentTerms", "Net 1 day");
  }

  function onSubmit(data) {
    createNewInvoice(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-x-hidden px-8 py-6 pb-12"
    >
      <h2 className="text-2xl font-bold text-skin-black">New Invoice</h2>

      <h3 className="mt-8 text-xs font-bold capitalize text-skin-purple">
        Bill from
      </h3>

      <FormCol
        classes={"mt-6"}
        label={"Street address"}
        error={errors?.senderAddress?.street}
      >
        <FormInput
          register={register}
          name={"senderAddress.street"}
          autoComplete="on"
        />
      </FormCol>

      <FormRow classes={"mt-6 gap-4"}>
        <FormCol label={"City"} error={errors?.senderAddress?.city}>
          <FormInput
            register={register}
            name={"senderAddress.city"}
            autoComplete="on"
          />
        </FormCol>

        <FormCol label={"Post code"} error={errors?.senderAddress?.postCode}>
          <FormInput
            register={register}
            name={"senderAddress.postCode"}
            autoComplete="on"
          />
        </FormCol>

        <FormCol label={"Country"} error={errors?.senderAddress?.country}>
          <FormInput
            register={register}
            name={"senderAddress.country"}
            autoComplete="on"
          />
        </FormCol>
      </FormRow>

      <h3 className="mt-8 text-xs font-bold capitalize text-skin-purple">
        Bill to
      </h3>

      <FormCol
        classes={"mt-6"}
        label={"Client's name"}
        error={errors?.clientName}
      >
        <FormInput register={register} name={"clientName"} />
      </FormCol>

      <FormCol
        classes={"mt-6"}
        label={"Client's email"}
        error={errors?.clientEmail}
      >
        <FormInput register={register} name={"clientEmail"} type="email" />
      </FormCol>

      <FormCol
        classes={"mt-6"}
        label={"Street address"}
        error={errors?.clientAddress?.street}
      >
        <FormInput register={register} name={"clientAddress.street"} />
      </FormCol>

      <FormRow classes={"mt-6 gap-4"}>
        <FormCol label={"City"} error={errors?.clientAddress?.city}>
          <FormInput register={register} name={"clientAddress.city"} />
        </FormCol>

        <FormCol label={"Post code"} error={errors?.clientAddress?.postCode}>
          <FormInput register={register} name={"clientAddress.postCode"} />
        </FormCol>

        <FormCol label={"Country"} error={errors?.clientAddress?.country}>
          <FormInput register={register} name={"clientAddress.country"} />
        </FormCol>
      </FormRow>

      <FormCol
        classes={"mt-6 w-full"}
        label={"Invoice date"}
        error={errors?.invoiceDate}
      >
        <SelectDate paymentDue={paymentDue} setPaymentDue={setPaymentDue} />
      </FormCol>

      <FormCol
        classes={"mt-6"}
        label={"Payment terms"}
        error={errors?.paymentTerms}
      >
        <SelectionField
          active={getValues("paymentTerms")}
          menuItems={["Net 1 day", "Net 7 days", "Net 14 days", "Net 30 days"]}
          setValue={setValue}
          setPaymentDue={setPaymentDue}
        />
      </FormCol>

      <FormCol
        classes={"mt-6"}
        label={"Project description"}
        error={errors?.description}
      >
        <FormInput register={register} name={"description"} />
      </FormCol>

      <ItemsList items={items} setItems={setItems} />

      <FormRow classes={"mt-10 justify-between items-center xs:mt-12"}>
        <Modal.Close>
          <button
            type="reset"
            className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70 "
          >
            Discard
          </button>
        </Modal.Close>

        <div className="flex flex-col gap-4 xs:flex-row">
          <button
            type="button"
            disabled={isCreating}
            onClick={() => {
              setValue("status", "draft");
              createNewInvoice(getValues());

              clearForm();
              closeModal();
            }}
            className="btn-sm order-2 bg-skin-gray font-bold text-skin-baliHai hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={isCreating}
            className="btn-sm order-1 bg-skin-purple text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-90"
          >
            {isCreating ? "Creating..." : "Save & Send"}
          </button>
        </div>
      </FormRow>
    </form>
  );
}

export default CreateInvoiceForm;
