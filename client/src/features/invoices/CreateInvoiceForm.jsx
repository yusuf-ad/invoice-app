import { useForm } from "react-hook-form";

import FormCol from "../../components/UI/FormCol";
import FormInput from "../../components/UI/FormInput";
import FormRow from "../../components/UI/FormRow";
import ItemsList from "../../components/UI/ItemsList";
import SelectionField from "../../components/UI/SelectionField";
import SelectDate from "../../components/UI/SelectDate";
import { useState } from "react";
import { millisecondsInADay } from "../../utils/millisecondsInADay";

function CreateInvoiceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm();

  const [paymentDue, setPaymentDue] = useState(
    // initial date is set to tomorrow
    new Date(Date.now() + millisecondsInADay),
  );

  function onSubmit(data) {
    const items = getValues("items");
    const itemsArray = Object.values(items);

    const total = itemsArray.reduce((acc, item) => +acc + +item.itemPrice, 0);

    console.log({
      ...data,
      total,
      items: itemsArray,
      paymentTerms: data.paymentTerms ? data.paymentTerms : "Net 1 day",
      paymentDue,
    });
  }

  function onError() {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="px-8 py-6 pb-12 "
    >
      <h2 className="text-xl font-bold text-black">New Invoice</h2>

      <h3 className="mt-8 text-xs font-bold capitalize text-purple">
        Bill from
      </h3>

      <FormCol
        classes={"mt-6"}
        label={"Street address"}
        error={errors?.senderAddress?.streetAddress}
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

      <h3 className="mt-8 text-xs font-bold capitalize text-purple">Bill to</h3>

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

      <h3 className="mt-6 text-lg font-bold capitalize text-baliHai">
        Item list
      </h3>

      <ItemsList
        watch={watch}
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <FormRow classes={"justify-between mt-12"}>
        <div>
          <button
            type="reset"
            className="btn-sm  bg-gray-200/35 text-shipCove hover:bg-selago"
          >
            Discard
          </button>
        </div>

        <div className="space-x-3">
          <button className="btn-sm bg-ebony text-xs font-bold text-baliHai ">
            Save as Draft
          </button>
          <button className="btn-sm bg-purple text-xs font-bold text-white ">
            Save & Send
          </button>
        </div>
      </FormRow>
    </form>
  );
}

export default CreateInvoiceForm;
