export function InvoicesCount({ invoicesLength = 0 }) {
  return (
    <div className="space-y-1 xl:space-y-3">
      <h2 className="text-xl font-bold text-black xl:text-3xl">Invoices</h2>
      <p className="text-sm text-baliHai md:hidden">
        {invoicesLength} invoices
      </p>
      <p className="hidden text-sm text-baliHai md:block">
        There are {invoicesLength} total invoices
      </p>
    </div>
  );
}
