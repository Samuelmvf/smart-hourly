"use client";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Suspense, useEffect, useReducer } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { dateToLocaleStringDateAndTime, numberToBRL } from "@/lib/utils";

import { isEditingAtom } from "@/atoms/pages/atoms-settings-page";

import { Button } from "@/components/ui/button";
import { MoneyInput, NumberInput, ViewOnlyInput } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

import { CreateProfessionalInformationRequest } from "@/services/professional-information/requests";
import { useProfessionalInformationService } from "@/services/professional-information/service";

const MONTH_DAYS_OF_WORK = 22;
const MAX_DAILY_HOURS = 24;

const professionalInformationSchema = z.object({
  baseSalary: z.number(),
  dailyWorkHours: z.number().max(MAX_DAILY_HOURS, {
    message: `The limit of daily work hours is ${MAX_DAILY_HOURS} hours`,
  }),
});

export type ProfessionalInformationForm = z.infer<typeof professionalInformationSchema>;

export function ProfessionalInformationForm() {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  const { getLastProfessionalInformation, createProfessionalInformation } = useProfessionalInformationService();

  const { error, data } = useSuspenseQuery({
    queryKey: ["lastProfessionalInformation"],
    queryFn: getLastProfessionalInformation,
  });

  const form = useForm<ProfessionalInformationForm>({
    resolver: zodResolver(professionalInformationSchema),
    defaultValues: {
      baseSalary: data.baseSalary,
      dailyWorkHours: data.dailyWorkHours,
    },
  });

  const [baseSalaryValue, setBaseSalaryValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return numberToBRL(Number(digits) / 100);
  }, numberToBRL(data.baseSalary));

  const [dailyWorkHoursValue, setDailyWorkHoursValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return Number(digits);
  }, data.dailyWorkHours + "");

  const createProfessionalInformationMutation = useMutation({
    mutationFn: createProfessionalInformation,
    onSuccess: () => {
      toast.success("Professional information updated successfully");
      queryClient.invalidateQueries({ queryKey: ["lastProfessionalInformation"] });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating professional information:", error);
      toast.error("Error updating professional information");
    },
  });

  // Reset the isEditing state when the component unmounts
  useEffect(() => {
    return () => {
      setIsEditing(false);
    };
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const baseSalary = form.watch("baseSalary");
  const dailyWorkHours = form.watch("dailyWorkHours");

  const calculatedHourlyRate = numberToBRL(baseSalary / (dailyWorkHours * MONTH_DAYS_OF_WORK)) || "0";
  const hourlyRate = calculatedHourlyRate.includes("NaN") || calculatedHourlyRate.includes("∞") ? "R$ 0,00" : calculatedHourlyRate;
  const lastSalaryUpdate = dateToLocaleStringDateAndTime(data?.createdAt);

  function onSubmit(formValues: ProfessionalInformationForm) {
    const payload: CreateProfessionalInformationRequest = {
      baseSalary: formValues.baseSalary,
      dailyWorkHours: formValues.dailyWorkHours,
    };
    createProfessionalInformationMutation.mutate(payload);
  }

  function onCancel() {
    form.reset({
      baseSalary: data.baseSalary,
      dailyWorkHours: data.dailyWorkHours,
    });
    setBaseSalaryValue(numberToBRL(data.baseSalary));
    setDailyWorkHoursValue(data.dailyWorkHours + "");
    setIsEditing(false);
  }

  return (
    // TODO: create a loading state component for the form
    <Suspense fallback={<div>Loading...</div>}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <MoneyInput
              form={form}
              label='Base Salary'
              name='baseSalary'
              placeholder='Enter your base salary'
              disabled={!isEditing}
              value={baseSalaryValue}
              setValue={setBaseSalaryValue}
            />

            <NumberInput
              form={form}
              label='Daily Work Hours'
              name='dailyWorkHours'
              placeholder='Enter your daily work hours'
              disabled={!isEditing}
              value={dailyWorkHoursValue}
              setValue={setDailyWorkHoursValue}
            />

            <ViewOnlyInput
              label='Base Hourly Rate'
              value={hourlyRate}
              description='The base hourly rate is calculated based on your base salary and your daily work hours.'
            />

            <ViewOnlyInput label='Last Salary update' value={lastSalaryUpdate} />
          </div>

          {isEditing && (
            <div className='flex justify-end mt-4 gap-2'>
              <Button variant={"confirm"} type='submit'>
                Update
              </Button>

              <Button className='dark:hidden' type='button' variant={"destructive-ghost"} onClick={onCancel}>
                Cancel
              </Button>

              <Button className='hidden dark:block' type='button' variant={"destructive"} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </Suspense>
  );
}
