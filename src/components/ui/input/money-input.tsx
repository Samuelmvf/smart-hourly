"use client";
import { numberToBRL } from "@/lib/utils";
import { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "./input";

type MoneyInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
};

export const MoneyInput = function ({
  form,
  name,
  label,
  placeholder,
  disabled = false,
}: MoneyInputProps) {
  const initialValue = form.getValues()[name]
    ? numberToBRL(form.getValues()[name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return numberToBRL(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
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
