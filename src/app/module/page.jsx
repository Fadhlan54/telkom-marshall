"use client";

import MainLayout from "@/components/layouts/MainLayout";
import CreateLayout from "@/components/layouts/CreateLayout";
import { useState } from "react";

export default function ModulePage() {
  const [step, setStep] = useState(1);

  const handleStep = (e, type) => {
    e.preventDefault();

    if (type === "next") {
      setStep(step + 1);
    } else if (type === "prev") {
      setStep(step - 1);
    }
  };
  return (
    <MainLayout>
      <CreateLayout>
        <h3 className="text-center font-semibold text-2xl">Generate Module</h3>
        <div className="mt-4 flex justify-between items-center gap-6">
          <div className="max-w-[50%]">
            <p className="font-semibold">Main Content</p>
            <p className="text-sm text-neutral-500">
              Pilih kompetensi yang dibutuhkan untuk pembuatan modul pelatihan
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium mb-2">Step {step}/3</p>
            <div className="flex gap-2">
              <div
                className={`${
                  step === 1 ? "bg-neutral-400" : "bg-neutral-200"
                } h-2 w-8 rounded-full`}
              ></div>
              <div
                className={`${
                  step === 2 ? "bg-neutral-400" : "bg-neutral-200"
                } h-2 w-8 rounded-full`}
              ></div>
              <div
                className={`${
                  step === 3 ? "bg-neutral-400" : "bg-neutral-200"
                } h-2 w-8 rounded-full`}
              ></div>
            </div>
          </div>
        </div>
        <form action="" className="mt-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="competence-group" className="font-semibold">
                Competance Group <span className="text-red-500">*</span>
              </label>
              <select
                name="competence-group"
                id="competence-group"
                className="w-full border-2 border-neutral-400 p-2 rounded-lg "
              >
                <option value="1">Kompetensi 1</option>
                <option value="2">Kompetensi 2</option>
                <option value="3">Kompetensi 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="competence-name" className="font-semibold">
                Competance Name <span className="text-red-500">*</span>
              </label>
              <select
                name="competence-name"
                id="competence-name"
                className="w-full border-2 border-neutral-400 p-2 rounded-lg "
              >
                <option value="1">Kompetensi 1</option>
                <option value="2">Kompetensi 2</option>
                <option value="3">Kompetensi 3</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="competence-level" className="font-semibold">
                Competance Level <span className="text-red-500">*</span>
              </label>
              <select
                name="competence-level"
                id="competence-level"
                className="w-full border-2 border-neutral-400 p-2 rounded-lg "
              >
                <option value="1">Kompetensi 1</option>
                <option value="2">Kompetensi 2</option>
                <option value="3">Kompetensi 3</option>
              </select>
            </div>
          </div>
          <div
            className={`mt-4 flex ${
              step > 1 ? "justify-between" : "justify-end"
            }`}
          >
            {step > 1 && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={(e) => handleStep(e, "prev")}
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={(e) => handleStep(e, "next")}
              >
                Next
              </button>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            )}
          </div>
        </form>
      </CreateLayout>
    </MainLayout>
  );
}
