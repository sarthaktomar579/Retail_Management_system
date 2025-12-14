interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Sort</option>
      <option value="amount_desc">Amount ↓</option>
      <option value="amount_asc">Amount ↑</option>
      <option value="date_desc">Date ↓</option>
      <option value="date_asc">Date ↑</option>
    </select>
  );
};

export default SortDropdown;
