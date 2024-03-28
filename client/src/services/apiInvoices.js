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
