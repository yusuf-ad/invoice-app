import Loader from "./Loader/Loader";
import { useSelector } from "react-redux";
import { Invoice } from "./Invoice";
import { useQuery } from "react-query";

export function InvoicesList() {
  // const { isLoading, invoices } = useSelector((state) => state.invoices);

  // const query = useQuery({
  //   queryKey: ["invoices"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:8000/api/v1/invoices");
  //     const { data } = await res.json();

  //     return data.invoices;
  //   },
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log("error 😂", error);
  //   },
  // });

  // console.log(query);

  return (
    <p>hello</p>
    // <ul className="py-12 space-y-4">
    //   {isLoading && (
    //     <div className="absolute center-xy">
    //       <Loader />
    //     </div>
    //   )}

    //   {!isLoading &&
    //     invoices.map((invoice) => (
    //       <Invoice invoice={invoice} key={invoice._id} />
    //     ))}
    // </ul>
  );
}
