"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MAX_MONTH_HOURS = 24 * 31;

const professionalInformationSchema = z.object({
  baseSalary: z
    .number()
    .min(0, { message: "Base salary must be greater than 0" }),
  monthlyWorkHours: z
    .number()
    .min(0, { message: "Monthly work hours must be greater than 0" })
    .max(MAX_MONTH_HOURS, {
      message: `Monthly work hours must be less than ${MAX_MONTH_HOURS}`,
    }),
});

type ProfessionalInformationForm = z.infer<
  typeof professionalInformationSchema
>;

interface ProfessionalInformationFormProps {
  isEditing: boolean;
  handleEdit: () => void;
}

export const ProfessionalInformationForm = ({
  isEditing,
  handleEdit,
}: ProfessionalInformationFormProps) => {
  const form = useForm<ProfessionalInformationForm>({
    resolver: zodResolver(professionalInformationSchema),
    defaultValues: {
      baseSalary: 1,
      monthlyWorkHours: 1,
    },
  });

  function onFormSubmit(formValues: ProfessionalInformationForm) {
    // TODO: Save the form values to the database
    console.log(formValues);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='baseSalary'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Salary</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your base salary'
                    {...field}
                    type='number'
                    disabled={!isEditing}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='monthlyWorkHours'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Work Hours</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your monthly work hours'
                    {...field}
                    type='number'
                    disabled={!isEditing}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEditing && (
          <div className='flex justify-end mt-4 gap-2'>
            <Button variant={"confirm"} type='submit'>
              Update
            </Button>
            <Button variant={"destructiveOutline"} onClick={handleEdit}>
              Cancel
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
