interface SelectProps {
  data?: { data: { id: string; name: string }[] };
  select: string;
  setSelect: (value: string) => void;
  label: string;
}

function Select({ data, select, setSelect, label }: SelectProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name="productId"
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="" disabled>
          Select an option
        </option>
        {data?.data.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
