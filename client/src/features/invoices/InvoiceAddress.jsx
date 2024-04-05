export function InvoiceAddress({ address, classes }) {
  return (
    <div className={`text-skin-baliHai space-y-2 text-xs ${classes}`}>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.postCode}</p>
      <p>{address.country}</p>
    </div>
  );
}
