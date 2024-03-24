import { useForm } from "react-hook-form";

import FormCol from "../../components/UI/FormCol";
import FormInput from "../../components/UI/FormInput";
import FormRow from "../../components/UI/FormRow";

function CreateInvoiceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="py-6 px-8 pb-12 "
    >
      <h2 className="text-black font-bold text-xl">New Invoice</h2>

      <h3 className="capitalize text-purple text-xs font-bold mt-8">
        Bill from
      </h3>

      <FormCol
        classes={"mt-6"}
        label={"Street address"}
        error={errors?.streetAddress}
      >
        <FormInput
          register={register}
          name={"streetAddress"}
          autoComplete="on"
        />
      </FormCol>

      <FormRow classes={"mt-6 gap-4"}>
        <FormCol label={"City"} error={errors?.city}>
          <FormInput register={register} name={"city"} autoComplete="on" />
        </FormCol>

        <FormCol label={"Post code"} error={errors?.postCode}>
          <FormInput register={register} name={"postCode"} autoComplete="on" />
        </FormCol>

        <FormCol label={"Country"} error={errors?.country}>
          <FormInput register={register} name={"country"} autoComplete="on" />
        </FormCol>
      </FormRow>

      <h3 className="capitalize text-purple text-xs font-bold mt-8">Bill to</h3>

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
        error={errors?.clientAddress}
      >
        <FormInput register={register} name={"clientAddress"} />
      </FormCol>

      <FormRow classes={"mt-6 gap-4"}>
        <FormCol label={"City"} error={errors?.clientCity}>
          <FormInput register={register} name={"clientCity"} />
        </FormCol>

        <FormCol label={"Post code"} error={errors?.clientPostCode}>
          <FormInput register={register} name={"clientPostCode"} />
        </FormCol>

        <FormCol label={"Country"} error={errors?.clientCountry}>
          <FormInput register={register} name={"clientCountry"} />
        </FormCol>
      </FormRow>

      <FormCol
        classes={"mt-6"}
        label={"Project description"}
        error={errors?.description}
      >
        <FormInput register={register} name={"description"} />
      </FormCol>

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
          <button className="btn-sm bg-ebony text-xs text-baliHai font-bold ">
            Save as Draft
          </button>
          <button className="btn-sm bg-purple text-xs text-white font-bold ">
            Save & Send
          </button>
        </div>
      </FormRow>
    </form>
  );
}

export default CreateInvoiceForm;
