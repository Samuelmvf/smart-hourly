"use client";

import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "./input";

type NumberInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  value: number;
  setValue: (value: string) => void;
};

const numericCharactersRegex = /\D/g;

export const NumberInput = function ({ form, name, label, placeholder, disabled = false, value, setValue }: NumberInputProps) {
  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(numericCharactersRegex, "");
    realChangeFn(Number(digits));
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type='text'
                {...field}
                disabled={disabled}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
