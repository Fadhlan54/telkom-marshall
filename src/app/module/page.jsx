"use client";

import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { useState } from "react";
import GenerateModuleForm from "@/components/forms/GenerateModuleForm";
import FeedbackModuleForm from "@/components/forms/FeedbackModuleForm";
import Stepper from "@/components/common/Stepper";
import EditorContentForm from "@/components/forms/EditorContentForm";

export default function ModulePage() {
  const [currentStep, setCurrentStep] = useState(3);

  return (
    <MainLayout>
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        items={["Module Form", "Outline Adjustment", "Content Adjustment"]}
      />

      <ContentLayout>
        {currentStep === 1 && (
          <GenerateModuleForm setGenerateModuleStep={setCurrentStep} />
        )}
        {currentStep === 2 && (
          <FeedbackModuleForm setgenerateModuleStep={setCurrentStep} />
        )}
        {currentStep === 3 && (
          <EditorContentForm setgenerateModuleStep={setCurrentStep} />
        )}
      </ContentLayout>
    </MainLayout>
  );
}
