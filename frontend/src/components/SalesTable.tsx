type Props = {
  data: any[];
};

export default function SalesTable({ data }: Props) {
  if (!data || data.length === 0) {
    return <p className="loading">No data found</p>;
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
          <tr key={sale._id}>
            <td>{sale["Transaction ID"]}</td>
            <td>{sale["Date"]}</td>
            <td>{sale["Customer Name"]}</td>
            <td>{sale["Phone Number"]}</td>
            <td>{sale["Gender"]}</td>
            <td>{sale["Age"]}</td>
            <td>{sale["Customer Region"]}</td>
            <td>{sale["Product Category"]}</td>
            <td>{sale["Tags"]}</td>
            <td>{sale["Payment Method"]}</td>
            <td>₹{sale["Final Amount"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
