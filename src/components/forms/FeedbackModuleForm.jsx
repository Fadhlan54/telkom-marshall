import { useState } from "react";
import FormStep from "../common/FormStep";
import TextInput from "../inputs/TextInput";
import handleStep from "@/utils/handleStep";

const totalSteps = 3;

export default function FeedbackModuleForm({ setgenerateModuleStep }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    moduleTitle: "test module title",
    feedback: [
      {
        topic: "test topic 1",
        subtopic: ["Topic 1 test1", "Topic 1 test2", "Topic 1 test3"],
      },
      {
        topic: "test topic 2",
        subtopic: ["Topic 2 test1", "Topic 2 test2", "Topic 2 test3"],
      },
      {
        topic: "test topic 3",
        subtopic: ["Topic 3 test1", "Topic 3 test2", "Topic 3 test3"],
      },
    ],
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form action="">
      <h3 className="text-center font-semibold text-2xl">Feedback</h3>
      <div className="mt-4 mb-2 md:mb-4 flex flex-col md:flex-row justify-end items-start gap-4 md:gap-6">
        <FormStep currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div>
        <TextInput
          id={"moduleTitle"}
          value={form.moduleTitle}
          handleChange={handleChange}
          label={"Module Title"}
        />
        <p className="text-xs mt-1 text-neutral-500">
          Judul module yang akan digenerate, ubah apabila tidak sesuai
        </p>
      </div>
      <div
        className={`mt-4 flex ${
          currentStep > 1 ? "justify-between" : "justify-end"
        }`}
      >
        {currentStep > 1 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => handleStep(e, currentStep, setCurrentStep, "prev")}
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => handleStep(e, currentStep, setCurrentStep, "next")}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => console.log("submit")}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
