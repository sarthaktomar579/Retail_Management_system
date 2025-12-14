import { Filters } from "../utils/types";

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};


const OPTIONS = {
  region: ["North", "South", "East", "West", "Central"],
  gender: ["Male", "Female"],
  category: ["Electronics", "Clothing", "Beauty"],
  paymentMethod: ["UPI", "Credit Card", "Debit Card", "Cash", "Wallet", "Net Banking"],
};

export default function FilterPanel({ filters, setFilters }: Props) {
  const toggle = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="filters">
      {Object.entries(OPTIONS).map(([key, values]) => (
        <div className="filter-group" key={key}>
          <label>{key}</label>
          <div className="dropdown">
            {values.map(v => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={filters[key as keyof Filters].includes(v)}
                  onChange={() => toggle(key as keyof Filters, v)}
                />
                {v}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
