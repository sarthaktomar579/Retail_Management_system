type Props = {
  data: any[];
};

export default function SalesTable({ data }: Props) {
  if (!data || data.length === 0) {
    return <p>No data found</p>;
  }

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
        {data.map((sale) => (
          <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{sale.date}</td>
            <td>{sale.customer}</td>
            <td>{sale.phone}</td>
            <td>{sale.gender}</td>
            <td>{sale.age}</td>
            <td>{sale.region}</td>
            <td>{sale.category}</td>
            <td>{sale.tags}</td>
            <td>{sale.payment}</td>
            <td>₹{sale.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
