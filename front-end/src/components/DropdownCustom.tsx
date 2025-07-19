import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface DropdownCustomProps {
  data: { id: string; name: string; price?: number }[];
  placeholder?: string;
  name?: string;
  label?: string;
  search: (value: string) => void;
  onChange?: (value: string) => void;
  value?: string;
}

export const DropdownCustom: React.FC<DropdownCustomProps> = ({
  data,
  placeholder = "Chọn tên",
  name = "dropdown",
  label = "Chọn người dùng",
  search,
  onChange,
  value,
}) => {
  const [selected, setSelected] = React.useState<
    { id: string; name: string; price?: number } | undefined
  >();

  // Update selected when value prop changes
  React.useEffect(() => {
    if (value) {
      const found = data.find((item) => item.id === value);
      setSelected(found);
    } else {
      setSelected(undefined);
    }
  }, [value, data]);

  const handleSelect = (item: { id: string; name: string; price?: number }) => {
    setSelected(item);
    onChange?.(item.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Input
            placeholder={placeholder}
            name={name}
            value={selected?.name || ""}
            readOnly
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuLabel>
          <Input
            onChange={(e) => {
              search(e.target.value);
            }}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((item) => (
          <DropdownMenuItem key={item.id} onClick={() => handleSelect(item)}>
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
