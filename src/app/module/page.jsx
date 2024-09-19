"use client";

import MainLayout from "@/components/layouts/MainLayout";
import CreateLayout from "@/components/layouts/CreateLayout";
import { useState } from "react";
import SelectInput from "@/components/inputs/SelectInput";
import GenerateModuleForm from "@/components/forms/GenerateModuleForm";

export default function ModulePage() {
  return (
    <MainLayout>
      <CreateLayout>
        <GenerateModuleForm />
      </CreateLayout>
    </MainLayout>
  );
}
