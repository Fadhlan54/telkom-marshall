import { useState } from "react";
import SelectInput from "../inputs/SelectInput";
import FormStep from "../common/FormStep";
import TextInput from "../inputs/TextInput";
import TextAreaInput from "../inputs/TextAreaInput";
import handleStep from "@/utils/handleStep";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "@/lib/slices/toastSlice";
import {
  RiAedLine,
  RiCloseFill,
  RiDvdLine,
  RiSettings4Fill,
} from "react-icons/ri";
import { setHasChanged } from "@/lib/slices/hasChangedSlice";
import Modal from "../modals/Modal";
import CustomLink from "../common/CustomLink";
import MultiSelectInput from "../inputs/MultiSelectInput";

const totalSteps = 4;

export default function GenerateModuleForm({ setGenerateModuleStep }) {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    competenceName: "",
    competenceGroup: "",
    competenceLevel: "",
    moduleTitle: "",
    elo: "",
    topic1: "",
    topic2: "",
    topic3: "",
    referenceMethod: "",
    ebookReference: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "ebookReference") {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: [...prev.ebookReference, e.target.value],
      }));
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateNextStep = () => {
    if (currentStep === 1) {
      if (
        !form.competenceName ||
        !form.competenceGroup ||
        !form.competenceLevel
      ) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message:
              "'Competence Name', 'Competence Group' and 'Competence Level' are required",
            duration: 4000,
          })
        );
        return false;
      }
      return true;
    } else {
      return true;
    }
  };

  const deleteEbookReference = (index) => {
    setForm((prev) => ({
      ...prev,
      ebookReference: prev.ebookReference.filter((_, i) => i !== index),
    }));
  };

  const handleCustomGenerate = (e) => {
    e.preventDefault();

    if (!form.referenceMethod) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: "Reference Method is required",
          duration: 4000,
        })
      );
      return;
    }

    if (form.referenceMethod === "manual" && form.ebookReference.length === 0) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: "E-book reference is required",
          duration: 4000,
        })
      );
      return;
    }
    setGenerateModuleStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.referenceMethod) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: "Reference Method is required",
          duration: 4000,
        })
      );
      return;
    }

    if (form.referenceMethod === "manual" && form.ebookReference.length === 0) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: "E-book reference is required",
          duration: 4000,
        })
      );
      return;
    }
    setShowModal(true);
    //setGenerateModuleStep(2);
  };

  const handleHasChanged = () => {
    dispatch(setHasChanged(true));
  };

  return (
    <form action="" className="mt-4" onChange={handleHasChanged}>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-lg">Choose Generate Type</h1>
            <button onClick={() => setShowModal(false)}>
              <RiCloseFill className="h-6 w-6 text-neutral-600 hover:text-alert-danger" />
            </button>
          </div>
          <button
            className="p-4 mt-3 bg-neutral-200 w-full rounded-md flex items-center gap-3"
            onClick={handleCustomGenerate}
          >
            <RiSettings4Fill className="h-14 w-14 md:h-16 md:w-16" />
            <div className="py-2">
              <h3 className="text-left font-semibold text-sm md:text-base">
                Custom Module Generation
              </h3>
              <p className="text-left text-xs md:text-sm">
                Adjust module options to suit your requirements
              </p>
            </div>
          </button>
          <CustomLink
            href={"module/1"}
            className="p-4 mt-3 bg-neutral-200 w-full rounded-md flex items-center gap-3"
            submit
          >
            <RiDvdLine className="h-14 w-14 md:h-16 md:w-16 rotate-6" />
            <div className="py-2">
              <h3 className="text-left font-semibold text-sm md:text-base">
                Quick Module Generation
              </h3>
              <p className="text-left text-xs md:text-sm">
                Generate module instantly without adjustments
              </p>
            </div>
          </CustomLink>
        </Modal>
      )}
      <h3 className="text-center font-semibold text-2xl">Generate Module</h3>
      <div className="mt-4 mb-2 md:mb-4 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
        <div className="w-full">
          <p className="font-semibold">
            {currentStep === 1 ? "Main Content" : "Optional Content"}
          </p>
          <p className="text-sm text-neutral-500">
            Pilih kompetensi yang dibutuhkan untuk pembuatan modul pelatihan
          </p>
        </div>
        <FormStep currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      {currentStep === 1 && (
        <div className="space-y-4">
          <SelectInput
            id={"competenceGroup"}
            value={form.competenceGroup}
            handleChange={handleChange}
            label={"Competence Group"}
            placeholder={"Select Competance Group"}
            options={[
              { label: "Competance Group 1", value: "1" },
              { label: "Competance Group 2", value: "2" },
              { label: "Competance Group 3", value: "3" },
            ]}
            required
          />
          <SelectInput
            id={"competenceName"}
            value={form.competenceName}
            handleChange={handleChange}
            label={"Competance Name"}
            placeholder={"Select Competance Name"}
            options={[
              { label: "Competence name 1", value: "1" },
              { label: "Competence name 2", value: "2" },
              { label: "Competence name 3", value: "3" },
            ]}
            required
          />

          <SelectInput
            id={"competenceLevel"}
            value={form.competenceLevel}
            handleChange={handleChange}
            label={"Competence Level"}
            placeholder={"Select Competance Level"}
            options={[
              { label: "Fundamental", value: "fundamental" },
              { label: "Developing", value: "developing" },
              { label: "Intermediate", value: "intermediate" },
              { label: "Advanced", value: "advanced" },
              { label: "Mastery", value: "mastery" },
            ]}
            required
          />
        </div>
      )}
      {currentStep === 2 && (
        <div className="space-y-4">
          <TextInput
            id={"moduleTitle"}
            value={form.moduleTitle}
            handleChange={handleChange}
            label={"Module Title"}
          />
          <TextAreaInput
            id={"elo"}
            value={form.elo}
            handleChange={handleChange}
            label={"Enable Learning Objective"}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div className="space-y-4">
          <TextAreaInput
            id={"topic1"}
            value={form.topic1}
            handleChange={handleChange}
            label={"Topic 1"}
          />
          <TextAreaInput
            id={"topic2"}
            value={form.topic2}
            handleChange={handleChange}
            label={"Topic 2"}
          />
          <TextAreaInput
            id={"topic3"}
            value={form.topic3}
            handleChange={handleChange}
            label={"Topic 3"}
          />
        </div>
      )}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div>
            <SelectInput
              id={"referenceMethod"}
              value={form.referenceMethod}
              handleChange={handleChange}
              label={"Reference Method"}
              placeholder={"Select Reference Method"}
              options={[
                { label: "Auto", value: "auto" },
                { label: "Manual", value: "manual" },
              ]}
              required
            />
            <p className="text-xs mt-1">
              Jika memilih Auto, maka sistem akan melakukan pencarian referensi
              secara otomatis melalui internet dan repositori TCUC
            </p>
          </div>

          {form.referenceMethod === "manual" && (
            <div>
              <MultiSelectInput
                id={"ebookReference"}
                label={"Ebook Reference"}
                value={form.ebookReference}
                handleChange={handleChange}
                placeholder={"Select Ebook Reference"}
                options={[
                  { label: "Ebook Reference 1", value: "1" },
                  { label: "Ebook Reference 2", value: "2" },
                  { label: "Ebook Reference 3", value: "3" },
                ].filter((ebook) => !form.ebookReference.includes(ebook.value))}
                required
              />
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {form.ebookReference.length > 0 &&
                  form.ebookReference.map((item, index) => (
                    <div
                      className="px-3 py-1 rounded-full flex gap-1 items-center bg-neutral-200"
                      key={index}
                    >
                      <p>{item}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteEbookReference(index);
                        }}
                      >
                        <RiCloseFill className="h-3 w-3 text-alert-danger" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
            onClick={(e) => handleStep(e, currentStep, setCurrentStep, "prev")}
          >
            Previous
          </button>
        )}
        {currentStep < totalSteps ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) =>
              handleStep(
                e,
                currentStep,
                setCurrentStep,
                "next",
                validateNextStep
              )
            }
          >
            Next
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
