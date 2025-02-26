"use client";
import { useState } from "react";

import { LucideCog, Pencil } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";

import { ProfessionalInformationForm } from "./components/professional-information-form";

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    // TODO: Implement the edit functionality
    setIsEditing(!isEditing);
  }

  return (
    <section
      className='min-w-[400px]'
      about='Settings | Allow user to define the salary information and expectations'
    >
      <PageTitle title='Settings' Icon={LucideCog} />

      <Card className='bg-gray-100 dark:bg-gray-800 mt-3'>
        <CardHeader className='text-xl font-medium grid grid-cols-[1fr_auto]'>
          <div className='flex flex-col flex-1'>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Define your professional information to calculate your salary.
            </CardDescription>
          </div>
          {!isEditing && (
            <Button variant='edit' size='icon' onClick={handleEdit}>
              <Pencil />
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <ProfessionalInformationForm
            isEditing={isEditing}
            handleEdit={handleEdit}
          />
        </CardContent>
      </Card>
    </section>
  );
}
