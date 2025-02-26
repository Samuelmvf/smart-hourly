"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
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
      <h1 className='text-2xl font-semibold'>Settings</h1>

      <Card className='bg-gray-100 mt-3'>
        <CardHeader className='text-xl font-medium flex justify-between'>
          <div>
            <CardTitle className='flex justify-between'>
              Professional Information
              <Button variant='edit' size='icon' onClick={handleEdit}>
                <Pencil />
              </Button>
            </CardTitle>
            <CardDescription>
              Define your professional information to calculate your salary.
            </CardDescription>
          </div>
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
