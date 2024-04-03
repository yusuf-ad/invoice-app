export function InvoiceStatus({ status = "paid" }) {
  const statusStyle = {
    paid: ["bg-green-100/50 text-green-600", "bg-green-600"],
    pending: ["bg-orange/10 text-orange", "bg-orange"],
    draft: ["bg-gray-100/50 text-gray-600", "bg-gray-600"],
  };

  return (
    <p
      className={`min-w-28 text-xs text-center py-3 rounded-md font-bold ${statusStyle[
        status.toLowerCase()
      ].at(0)}`}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full mr-2 ${statusStyle[
          status.toLowerCase()
        ].at(1)}`}
      ></span>
      {status[0].toUpperCase() + status.slice(1)}
    </p>
  );
}
