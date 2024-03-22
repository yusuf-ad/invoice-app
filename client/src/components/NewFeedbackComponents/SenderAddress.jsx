import { InvoiceInput } from "./InvoiceInput";

export function SenderAddress({ handleInputChange }) {
  function onChangeFunction(e) {
    handleInputChange(e, "senderAddress");
  }

  return (
    <div className="mt-6 flex flex-col gap-6 ">
      <InvoiceInput
        onChangeFunction={onChangeFunction}
        label={"street address"}
        name={"street"}
      />

      <div className="flex gap-4">
        <InvoiceInput
          onChangeFunction={onChangeFunction}
          label={"city"}
          name={"city"}
        />
        <InvoiceInput
          onChangeFunction={onChangeFunction}
          label={"post code"}
          name={"postCode"}
        />
        <InvoiceInput
          onChangeFunction={onChangeFunction}
          label={"country"}
          name={"country"}
        />
      </div>
    </div>
  );
}
