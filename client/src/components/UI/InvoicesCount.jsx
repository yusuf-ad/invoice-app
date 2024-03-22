export function InvoicesCount({ invoices }) {
  return (
    <div className="space-y-1 xl:space-y-3">
      <h2 className="text-black text-xl xl:text-3xl font-bold">Invoices</h2>
      <p className="md:hidden text-baliHai text-sm">
        {invoices.length} invoices
      </p>
      <p className="hidden md:block text-baliHai text-sm">
        There are {invoices.length} total invoices
      </p>
    </div>
  );
}
