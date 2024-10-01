"use client";

import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { useState } from "react";
import SelectInput from "@/components/inputs/SelectInput";
import GenerateModuleForm from "@/components/forms/GenerateModuleForm";

export default function ModulePage() {
  return (
    <MainLayout>
      <ContentLayout>
        <GenerateModuleForm />
      </ContentLayout>
    </MainLayout>
  );
}
