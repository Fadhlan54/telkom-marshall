import { useState } from "react";
import SelectInput from "../inputs/SelectInput";
import FormStep from "../fragments/FormStep";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import Link from "next/link";

export default function GenerateModuleForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [competenceName, setCompetenceName] = useState("");
  const [competenceGroup, setCompetenceGroup] = useState("");
  const [competenceLevel, setCompetenceLevel] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [elo, setElo] = useState("");
  const [topic1, setTopic1] = useState("");
  const [topic2, setTopic2] = useState("");
  const [topic3, setTopic3] = useState("");
  const [referenceMethod, setReferenceMethod] = useState("");
  const [ebookReference, setEbookReference] = useState("");

  const totalSteps = 4;
  const handleStep = (e, type) => {
    e.preventDefault();

    if (type === "next") {
      setCurrentStep(currentStep + 1);
    } else if (type === "prev") {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <form action="" className="mt-4">
      <h3 className="text-center font-semibold text-2xl">Generate Module</h3>
      <div className="my-4 flex justify-between items-center gap-6">
        <div className="max-w-[50%]">
          <p className="font-semibold">Main Content</p>
          <p className="text-sm text-neutral-500">
            Pilih kompetensi yang dibutuhkan untuk pembuatan modul pelatihan
          </p>
        </div>
        <FormStep currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      {currentStep === 1 && (
        <div className="space-y-4">
          <SelectInput
            id={"competence-name"}
            stateValue={competenceName}
            setStateValue={setCompetenceName}
            label={"Competance Name"}
            options={[
              { label: "Kompetence name 1", value: "1" },
              { label: "Kompetence name 2", value: "2" },
              { label: "Kompetence name 3", value: "3" },
            ]}
            required
          />
          <SelectInput
            id={"competence-group"}
            stateValue={competenceGroup}
            setStateValue={setCompetenceGroup}
            label={"Competence Group"}
            options={[
              { label: "Competance Group 1", value: "1" },
              { label: "Competance Group 2", value: "2" },
              { label: "Competance Group 3", value: "3" },
            ]}
            required
          />
          <SelectInput
            id={"competence-level"}
            stateValue={competenceLevel}
            setStateValue={setCompetenceLevel}
            label={"Competence Level"}
            options={[
              { label: "Competance Level 1", value: "1" },
              { label: "Competance Level 2", value: "2" },
              { label: "Competance Level 3", value: "3" },
            ]}
            required
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <TextInput
            id={"module-title"}
            stateValue={moduleTitle}
            setStateValue={setModuleTitle}
            label={"Module Title"}
          />
          <TextAreaInput
            id={"enable-learning-objective"}
            stateValue={elo}
            setStateValue={setElo}
            label={"Enable Learning Objective"}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <TextAreaInput
            id={"topic-1"}
            stateValue={topic1}
            setStateValue={setTopic1}
            label={"Topic 1"}
          />
          <TextAreaInput
            id={"topic-2"}
            stateValue={topic2}
            setStateValue={setTopic2}
            label={"Topic 2"}
          />
          <TextAreaInput
            id={"topic-3"}
            stateValue={topic3}
            setStateValue={setTopic3}
            label={"Topic 3"}
          />
        </div>
      )}
      {currentStep === 4 && (
        <div className="space-y-4">
          <SelectInput
            id={"reference-method"}
            stateValue={referenceMethod}
            setStateValue={setReferenceMethod}
            label={"Reference Method"}
            options={[
              { label: "Reference Method 1", value: "1" },
              { label: "Reference Method 2", value: "2" },
              { label: "Reference Method 3", value: "3" },
            ]}
          />
          <SelectInput
            id={"ebook-reference"}
            stateValue={ebookReference}
            setStateValue={setEbookReference}
            label={"Ebook Reference"}
            options={[
              { label: "Ebook Reference 1", value: "1" },
              { label: "Ebook Reference 2", value: "2" },
              { label: "Ebook Reference 3", value: "3" },
            ]}
          />
        </div>
      )}

      <div
        className={`mt-4 flex ${
          currentStep > 1 ? "justify-between" : "justify-end"
        }`}
      >
        {currentStep > 1 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => handleStep(e, "prev")}
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => handleStep(e, "next")}
          >
            Next
          </button>
        ) : (
          <Link
            href={"/module/1"}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </Link>
        )}
      </div>
    </form>
  );
}
