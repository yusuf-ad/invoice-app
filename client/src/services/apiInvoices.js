export async function getAllInvoices() {
  try {
    const res = await fetch("/api/v1/invoices");
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getInvoice(id) {
  try {
    const res = await fetch(`/api/v1/invoices/${id}`);
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createInvoice(newInvoice) {
  try {
    const res = await fetch(`/api/v1/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoice),
    });
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// export async function updateInvoice(invoice, invoiceId) {
//   try {
//     const res = await fetch(`/api/v1/invoices/${invoiceId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(invoice),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       const { message } = data;

//       throw new Error(message || "An error occurred!");
//     }

//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

export async function updateInvoice({ invoice, invoiceId }) {
  try {
    const res = await fetch(`/api/v1/invoices/${invoiceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });
    const data = await res.json();

    if (!res.ok) {
      const { message } = data;

      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteInvoice(invoiceId) {
  try {
    const res = await fetch(`/api/v1/invoices/${invoiceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 204) {
      return null;
    }

    const data = await res.json();

    if (!res.ok) {
      const { message } = data;
      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateInvoiceStatus(invoiceId) {
  try {
    const res = await fetch(`/api/v1/invoices/${invoiceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const { message } = data;
      throw new Error(message || "An error occurred!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
