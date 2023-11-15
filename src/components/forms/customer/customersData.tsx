import { Customer } from "@/interface";

interface CustomerProps {
  customer: Customer | null | undefined;
}

export default function CustomersData({
  customer,
}: CustomerProps): JSX.Element {
  return <div className="text-slate-800 ml-4">{customer?.name}</div>;
}
