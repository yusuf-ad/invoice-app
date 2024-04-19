export function InvoiceStatus({ status = "paid" }) {
  const statusStyle = {
    paid: ["bg-skin-green/10 text-skin-green", "bg-skin-green"],
    pending: ["bg-skin-orange/10 text-skin-orange", "bg-skin-orange"],
    draft: [
      "bg-skin-gray/10 text-skin-gray dark:text-skin-offWhite",
      "bg-skin-gray dark:bg-skin-offWhite",
    ],
  };

  return (
    <p
      className={`min-w-28 rounded-md py-3 text-center text-xs font-bold ${statusStyle[
        status.toLowerCase()
      ].at(0)}`}
    >
      <span
        className={`mr-2 inline-block h-2 w-2 rounded-full ${statusStyle[
          status.toLowerCase()
        ].at(1)}`}
      ></span>
      {status[0].toUpperCase() + status.slice(1)}
    </p>
  );
}
