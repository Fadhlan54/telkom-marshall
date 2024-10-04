"use client";

import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { useState } from "react";
import GenerateModuleForm from "@/components/forms/GenerateModuleForm";
import FeedbackModuleForm from "@/components/forms/FeedbackModuleForm";

const totalSteps = 4;

export default function ModulePage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <MainLayout>
      <div className="flex items-center justify-between text-sm mb-12 px-4">
        <div className="flex items-center w-full">
          <div className="flex flex-col items-center gap-1 relative">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center border  font-medium ${
                currentStep === 1
                  ? "bg-neutral-400 border-neutral-800"
                  : currentStep > 1
                  ? "bg-blue-500 text-white border-blue-800"
                  : "bg-neutral-200 border-neutral-400"
              }`}
            >
              1
            </div>
            <p className="text-center text-xs sm:text-[0.8rem] font-medium absolute -bottom-1 translate-y-full">
              Module Form
            </p>
          </div>
          <div
            className={`flex-grow mx-4 border-2 ${
              currentStep > 1 ? "border-blue-500" : "border-neutral-400"
            }`}
          />

          <div className="flex flex-col items-center gap-1 relative">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center border  font-medium ${
                currentStep === 2
                  ? "bg-neutral-400 border-neutral-800"
                  : currentStep > 2
                  ? "bg-blue-500 text-white border-blue-800"
                  : "bg-neutral-200 border-neutral-400"
              }`}
            >
              2
            </div>
            <p className="text-center text-xs sm:text-[0.8rem] font-medium absolute -bottom-1 translate-y-full">
              Feedback
            </p>
          </div>
          <div
            className={`flex-grow mx-4 border-2 ${
              currentStep > 2 ? "border-blue-500" : "border-neutral-400"
            }`}
          />

          <div className="flex flex-col items-center gap-1 relative">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center border  font-medium ${
                currentStep === 3
                  ? "bg-neutral-400 border-neutral-800"
                  : currentStep > 3
                  ? "bg-blue-500 text-white border-blue-800"
                  : "bg-neutral-200 border-neutral-400"
              }`}
            >
              3
            </div>
            <p className="text-center text-xs sm:text-[0.8rem] font-medium absolute -bottom-1 translate-y-full">
              Content
            </p>
          </div>
          <div
            className={`flex-grow mx-4 border-2 ${
              currentStep > 3 ? "border-blue-500" : "border-neutral-400"
            }`}
          />

          <div className="flex flex-col items-center gap-1 relative">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center border  font-medium ${
                currentStep === 4
                  ? "bg-neutral-400 border-neutral-800"
                  : currentStep > 4
                  ? "bg-blue-500 text-white border-blue-800"
                  : "bg-neutral-200 border-neutral-400"
              }`}
            >
              4
            </div>
            <p className="text-center text-xs sm:text-[0.8rem] font-medium absolute -bottom-1 translate-y-full">
              Done
            </p>
          </div>
        </div>
      </div>

      <ContentLayout>
        {currentStep === 1 && (
          <GenerateModuleForm setGenerateModuleStep={setCurrentStep} />
        )}
        {currentStep === 2 && <FeedbackModuleForm />}
      </ContentLayout>
    </MainLayout>
  );
}
