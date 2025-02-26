"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { MoneyInput, NumberInput } from "@/components/ui/input";
import { ViewOnlyInput } from "@/components/ui/input/view-only-input";
import { numberToBRL } from "@/lib/utils";

const MAX_MONTH_HOURS = 24 * 31;

const professionalInformationSchema = z.object({
  baseSalary: z.number(),
  monthlyWorkHours: z.number().max(MAX_MONTH_HOURS, {
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

  const baseSalary = form.watch("baseSalary");
  const monthlyWorkHours = form.watch("monthlyWorkHours");

  const calculatedHourlyRate =
    numberToBRL(baseSalary / monthlyWorkHours) || "0";

  const hourlyRate =
    calculatedHourlyRate.includes("NaN") || calculatedHourlyRate.includes("∞")
      ? "R$ 0,00"
      : calculatedHourlyRate;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <MoneyInput
            form={form}
            label='Base Salary'
            name='baseSalary'
            placeholder='Enter your base salary'
            disabled={!isEditing}
          />

          <NumberInput
            form={form}
            label='Monthly Work Hours'
            name='monthlyWorkHours'
            placeholder='Enter your monthly work hours'
            disabled={!isEditing}
          />

          <ViewOnlyInput
            label='Base Hourly Rate'
            value={hourlyRate}
            description='The base hourly rate is calculated based on your base salary and your monthly work hours.'
          />

          <ViewOnlyInput
            label='Last Salary update'
            value={new Date().toLocaleString()}
          />
        </div>

        {isEditing && (
          <div className='flex justify-end mt-4 gap-2'>
            <Button variant={"confirm"} type='submit'>
              Update
            </Button>

            <Button
              className='dark:hidden'
              variant={"destructiveOutline"}
              onClick={handleEdit}
            >
              Cancel
            </Button>

            <Button
              className='hidden dark:block'
              variant={"destructive"}
              onClick={handleEdit}
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
