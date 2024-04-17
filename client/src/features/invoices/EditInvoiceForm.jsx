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
import Modal, { useModal } from "../../ui/Modal/Modal";
import { useQueryClient } from "react-query";

function EditInvoiceForm() {
  const queryClient = useQueryClient();
  const { close: closeModal } = useModal();

  const { invoice } = queryClient.getQueryData("invoice");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: invoice,
  });

  const [paymentDue, setPaymentDue] = useState(
    // initial date is set to tomorrow
    new Date(Date.now() + millisecondsInADay),
  );

  const { createInvoice, isLoading: isCreating } = useCreateInvoice();

  function createNewInvoice(data) {
    const items = getValues("items");
    const itemsArray = Object.values(items).map((item) => ({
      ...item,
      totalPrice:
        +item.itemQty.replace(",", ".") * +item.itemPrice.replace(",", "."),
    }));

    const total = +itemsArray
      .reduce((acc, item) => +acc + +item.totalPrice, 0)
      .toFixed(2);

    const newInvoice = {
      ...data,
      total,
      items: itemsArray,
      paymentTerms: data.paymentTerms ? data.paymentTerms : "Net 1 day",
      paymentDue,
    };

    createInvoice(newInvoice);
  }

  function onSubmit(data) {
    createNewInvoice(data);

    closeModal();
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 pb-12 ">
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
        classes={"mt-6"}
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

      <h3 className="mt-8 text-lg font-bold capitalize text-skin-baliHai">
        Item list
      </h3>

      <ItemsList
        watch={watch}
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <FormRow classes={"justify-between mt-12"}>
        <Modal.Close>
          <button
            type="reset"
            className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Discard
          </button>
        </Modal.Close>

        <div className="space-x-3">
          <button
            type="button"
            disabled={isCreating}
            onClick={() => {
              setValue("status", "draft");
              createNewInvoice(getValues());
              reset();

              closeModal();
            }}
            className="btn-sm bg-skin-gray font-bold text-skin-baliHai hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={isCreating}
            className="btn-sm bg-skin-purple text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-90"
          >
            {isCreating ? "Creating..." : "Save & Send"}
          </button>
        </div>
      </FormRow>
    </form>
  );
}

export default EditInvoiceForm;
