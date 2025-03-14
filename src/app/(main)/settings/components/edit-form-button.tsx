"use client";

import { isEditingAtom } from "@/atoms/pages/atoms-settings-page";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { Pencil } from "lucide-react";

export function EditFormButton() {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom);

  function handleToggleEdit() {
    setIsEditing(!isEditing);
  }

  return (
    !isEditing && (
      <Button variant='edit' size='icon' onClick={handleToggleEdit}>
        <Pencil />
      </Button>
    )
  );
}
