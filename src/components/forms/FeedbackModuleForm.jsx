import { useState } from "react";
import FormStep from "../common/FormStep";
import TextInput from "../inputs/TextInput";
import handleStep from "@/utils/handleStep";
import TextAreaInput from "../inputs/TextAreaInput";
import Button from "../common/Button";
import { RiArrowLeftLine } from "react-icons/ri";

export default function FeedbackModuleForm({ setgenerateModuleStep }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    moduleTitle: "test module title",
    elo: "Test ELO",
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

  const [totalSteps, setTotalSteps] = useState(3);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <form action="">
      <h3 className="text-center font-semibold text-2xl">Outline Adjustment</h3>
      <div className="mt-4 mb-2 flex flex-col md:flex-row justify-end items-start gap-4 md:gap-6">
        <FormStep currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div>
        {form.feedback.map((item, index) => (
          <div key={index} className="flex flex-col">
            {currentStep === index + 1 && (
              <div>
                <TextInput
                  id={`topic-${index}`}
                  value={item.topic}
                  handleChange={handleChange}
                  label={"Topic " + (index + 1)}
                />
                {item.subtopic.map((subtopic, index) => (
                  <div key={index} className="my-4">
                    <TextAreaInput
                      id={`subtopic-${index}`}
                      value={subtopic}
                      handleChange={handleChange}
                      label={"Subtopic " + (index + 1)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`mt-2 flex ${
          currentStep > 1 ? "justify-between" : "justify-end"
        }`}
      >
        {currentStep > 1 && (
          <Button
            variant="danger"
            onClick={(e) => handleStep(e, currentStep, setCurrentStep, "prev")}
          >
            Previous
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button
            variant="primary"
            onClick={(e) => handleStep(e, currentStep, setCurrentStep, "next")}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              setgenerateModuleStep(3);
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
