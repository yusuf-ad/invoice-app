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
import Modal, { useModal } from "../../ui/Modal";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useEditInvoice } from "./useEditInvoice";

function EditInvoiceForm() {
  const queryClient = useQueryClient();
  const { close: closeModal } = useModal();
  const { id: invoiceId } = useParams();

  const { invoice } = queryClient.getQueryData(invoiceId) ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: invoice,
  });
  const [paymentDue, setPaymentDue] = useState(
    new Date(invoice?.paymentDue) ?? new Date(Date.now() + millisecondsInADay),
  );
  const [items, setItems] = useState(invoice?.items ?? []);

  const { editInvoice: editInvoiceAPI, isEditing } = useEditInvoice();

  function editInvoice(data) {
    const total = +items
      .reduce((acc, item) => +acc + +item.totalPrice, 0)
      .toFixed(2);

    const invoice = {
      ...data,
      total,
      items,
      paymentTerms: data.paymentTerms ? data.paymentTerms : "Net 1 day",
      paymentDue,
    };

    editInvoiceAPI({ invoice, invoiceId });
  }

  function onSubmit(data) {
    editInvoice(data);

    closeModal();
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
          active={getValues("paymentTerms") || "Net 1 day"}
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

      <FormRow classes={"justify-between mt-12"}>
        <Modal.Close>
          <button
            type="reset"
            className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Discard
          </button>
        </Modal.Close>

        <button
          type="submit"
          disabled={isEditing}
          className="btn-sm bg-skin-purple text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-90"
        >
          {isEditing ? "Creating..." : "Save & Send"}
        </button>
      </FormRow>
    </form>
  );
}

export default EditInvoiceForm;
