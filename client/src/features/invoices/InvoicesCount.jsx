export function InvoicesCount({ invoicesLength = 0 }) {
  return (
    <div className="space-y-2 xl:space-y-3">
      <h2 className="text-skin-black text-3xl font-bold xl:text-4xl">
        Invoices
      </h2>
      <p className="text-skin-baliHai text-sm md:hidden">
        {invoicesLength} invoices
      </p>
      <p className="text-skin-baliHai hidden text-sm md:block">
        There are {invoicesLength} total invoices
      </p>
    </div>
  );
}
