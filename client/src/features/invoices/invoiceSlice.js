import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/BASE_URL";

const initialState = {
  invoices: [],
  newInvoice: {
    paymentDue: new Date().toLocaleDateString(),
    description: "Invoice description",
    paymentTerms: "Net 7 Days",
    status: "Pending",
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
    items: [],
    total: 0,
  },
  isLoading: false,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getAllInvoices(state, action) {
      state.invoices = action.payload;
      state.isLoading = false;
    },
    getInvoice(state, action) {
      state.newInvoice = action.payload;
      state.isLoading = false;
    },
    createNewInvoice(state, action) {
      state.invoices.push(action.payload);
      state.isLoading = false;
    },
    loadingInvoices(state) {
      state.isLoading = true;
    },
  },
});

export function getAllInvoices(token) {
  return async function (dispatch) {
    dispatch({ type: "invoice/loadingInvoices" });

    try {
      const res = await fetch(`${BASE_URL}/api/v1/invoices`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const { data } = await res.json();

      dispatch({ type: "invoice/getAllInvoices", payload: data.invoices });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function getInvoice(token, invoiceId) {
  return async function (dispatch) {
    dispatch({ type: "invoice/loadingInvoices" });

    try {
      const res = await fetch(`${BASE_URL}/api/v1/invoices/${invoiceId}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const { data } = await res.json();

      dispatch({ type: "invoice/getInvoice", payload: data.invoice });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function createNewInvoice(token, newInvoice) {
  return async function (dispatch) {
    const res = await fetch(`${BASE_URL}/api/v1/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newInvoice),
    });
    const { data } = await res.json();

    dispatch({
      type: "invoice/createNewInvoice",
      payload: data.invoice,
    });
  };
}

export default invoiceSlice.reducer;
