export function InvoicesCount({ invoicesLength = 0 }) {
  return (
    <div className="space-y-1 xl:space-y-3">
      <h2 className="text-black text-xl xl:text-3xl font-bold">Invoices</h2>
      <p className="md:hidden text-baliHai text-sm">
        {invoicesLength} invoices
      </p>
      <p className="hidden md:block text-baliHai text-sm">
        There are {invoicesLength} total invoices
      </p>
    </div>
  );
}
