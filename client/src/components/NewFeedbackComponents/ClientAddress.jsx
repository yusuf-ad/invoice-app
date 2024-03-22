import { InvoiceInput } from "./InvoiceInput";

export function ClientAddress({ handleInputChange }) {
  function onChangeFunction(e) {
    handleInputChange(e, "clientAddress");
  }

  function handleClient(e) {
    handleInputChange(e);
  }

  return (
    <div className="mt-6 flex flex-col gap-6 ">
      <InvoiceInput
        onChangeFunction={handleClient}
        label={"client's name"}
        name={"clientName"}
      />
      <InvoiceInput
        onChangeFunction={handleClient}
        label={"client's email"}
        name={"clientEmail"}
        type="email"
      />

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
