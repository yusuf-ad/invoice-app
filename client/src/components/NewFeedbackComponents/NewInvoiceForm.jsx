import { useState } from "react";
import { ClientAddress } from "./ClientAddress";
import { InvoiceDate } from "./InvoiceDate";
import { InvoiceInput } from "./InvoiceInput";
import { Item } from "./Items/Item";
import { ItemList } from "./Items/ItemList";
import { PaymentTerms } from "./PaymentTerms";
import { SenderAddress } from "./SenderAddress";

import { useDispatch, useSelector } from "react-redux";

import { createNewInvoice } from "../../features/invoices/invoiceSlice";

import generateUniqueId from "generate-unique-id";
import { closeModal } from "../../features/modalSlice";

const newInvoiceModel = {
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientName: "",
  clientEmail: "",
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  paymentDue: new Date().toLocaleDateString(),
  paymentTerms: "",
  description: "",
  status: "Pending",
  items: [],
  total: 0,
};

const newItem = {
  name: "Item name",
  quantity: 1,
  price: 0,
  id: generateUniqueId({
    length: 6,
  }),
};

export function NewInvoiceForm() {
  const [newInvoice, setNewInvoice] = useState(newInvoiceModel);
  const [items, setItems] = useState([newItem]);

  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function addItem() {
    setItems((items) => [
      ...items,
      { ...newItem, id: generateUniqueId({ length: 6 }) },
    ]);
  }

  function handleInputChange(e, actorAddress) {
    const { name, value } = e.target;

    if (actorAddress) {
      setNewInvoice((invoice) => ({
        ...invoice,
        [actorAddress]: { ...invoice[actorAddress], [name]: value },
      }));
    } else {
      setNewInvoice((invoice) => ({ ...invoice, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const total = newInvoice.items.reduce(
      (total, curValue) => (total += curValue.quantity * curValue.price),
      0
    );

    dispatch(createNewInvoice(token, { ...newInvoice, total }));

    // setNewInvoice(newInvoiceModel);

    dispatch(closeModal());
  }

  return (
    <form onSubmit={handleSubmit} className="py-6 px-8 pb-12">
      <h2 className="text-black font-bold text-xl">New Invoice</h2>

      <h3 className="capitalize text-purple text-xs font-bold mt-8">
        Bill from
      </h3>
      <SenderAddress handleInputChange={handleInputChange} />

      <h3 className="capitalize text-purple text-xs font-bold mt-8">Bill to</h3>
      <ClientAddress handleInputChange={handleInputChange} />

      <div className="mt-4 space-y-6">
        <InvoiceDate setNewInvoice={setNewInvoice} />
        <PaymentTerms setNewInvoice={setNewInvoice} />

        <InvoiceInput
          onChangeFunction={handleInputChange}
          label={"Project description"}
          name={"description"}
        />
      </div>

      <h3 className="mt-6 text-baliHai font-bold capitalize">Item list</h3>
      <div>
        <ItemList>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              setItems={setItems}
              setNewInvoice={setNewInvoice}
            />
          ))}
        </ItemList>

        <button
          onClick={(e) => {
            e.preventDefault();

            addItem();
          }}
          className="mt-8 text-shipCove font-bold text-xs capitalize w-full bg-gray-200/35 rounded-full py-4 flex justify-center items-center gap-1 transition-colors-1 hover:bg-selago"
        >
          <img src="./assets/icon-plus.svg" alt="icon plus" />
          Add new item
        </button>
      </div>

      <div className="mt-12 flex justify-between">
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeModal());
            }}
            className="btn-sm bg-gray-200/35 text-shipCove hover:bg-selago"
          >
            Discard
          </button>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => {
              setNewInvoice((invoice) => ({
                ...invoice,
                items: [...items],
                status: "draft",
              }));
            }}
            className="btn-sm bg-ebony text-xs text-baliHai font-bold "
          >
            Save as Draft
          </button>
          <button
            onClick={() => {
              setNewInvoice((invoice) => ({ ...invoice, items: [...items] }));
            }}
            className="btn-sm bg-purple text-xs text-white font-bold "
          >
            Save & Send
          </button>
        </div>
      </div>
    </form>
  );
}
