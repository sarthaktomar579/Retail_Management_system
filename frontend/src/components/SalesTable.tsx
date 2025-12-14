import { Sale } from "../utils/types";

export default function SalesTable({ data }: { data: Sale[] }) {
  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Region</th>
          <th>Category</th>
          <th>Tags</th>
          <th>Payment</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map(sale => (
          <tr key={sale.transactionId}>
            <td>{sale.transactionId}</td>
            <td>{sale.date}</td>
            <td>{sale.customerName}</td>
            <td>{sale.phone}</td>
            <td>{sale.gender}</td>
            <td>{sale.age}</td>
            <td>{sale.region}</td>
            <td>{sale.category}</td>
            <td>{sale.tags}</td>
            <td>{sale.paymentMethod}</td>
            <td>₹{sale.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
