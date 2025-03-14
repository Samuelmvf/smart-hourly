import { ComponentProps } from "react";
import { Input } from "./input";

interface ViewOnlyInputProps extends ComponentProps<"input"> {
  label: string;
  value: string;
  description?: string;
}

const ViewOnlyInput = ({
  label,
  value,
  description,
  ...props
}: ViewOnlyInputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium'>{label}</label>
      <Input value={value} readOnly disabled {...props} />
      {description && (
        <p className='text-sm text-muted-foreground'>{description}</p>
      )}
    </div>
  );
};

ViewOnlyInput.displayName = "ViewOnlyInput";

export { ViewOnlyInput };
