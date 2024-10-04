"use client";

import FormStep from "@/components/common/FormStep";
import DragNDropInput from "@/components/inputs/DragNDropInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import ContentLayout from "@/components/layouts/ContentLayout";
import MainLayout from "@/components/layouts/MainLayout";
import Modal from "@/components/modals/Modal";
import {
  fetchCompetenceNameByGroup,
  fetchCompetencesGroup,
} from "@/service/competence";
import handleStep from "@/utils/handleStep";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiCloseFill, RiEditBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "@/lib/slices/toastSlice";
import Loading from "@/components/common/Loading";
import { setHasChanged } from "@/lib/slices/hasChangedSlice";

const totalSteps = 4;

export default function Ebook() {
  const dispatch = useDispatch();

  // form data state
  const [ebookFile, setEbookFile] = useState(null);
  const [competenceGroup, setCompetenceGroup] = useState("");
  const [competenceName, setCompetenceName] = useState([]);
  const [competenceNameEdit, setCompetenceNameEdit] = useState([]);

  const [form, setForm] = useState({
    competences: [],
    ebookType: "",
    language: "",
    ebookTitle: "",
    publisher: "",
    author: "",
    yearPublished: "",
    isbn: "",
    doi: "",
  });

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [competenceNameOption, setCompetenceNameOption] = useState([]);
  const [competenceGroupOption, setCompetenceGroupOption] = useState([]);
  const [isCreateCompetenceModalVisible, setIsCreateCompetenceModalVisible] =
    useState(false);
  const [isEditCompetenceModalVisible, setIsEditCompetenceModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCompetenceName, setIsFetchingCompetenceName] =
    useState(false);

  // error state
  const [competenceGroupError, setCompetenceGroupError] = useState(false);
  const [competenceNameError, setCompetenceNameError] = useState(false);
  const [competenceNameEditError, setCompetenceNameEditError] = useState(false);

  // utils
  const handleFormChange = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showCreateCompetenceModal = (e) => {
    e.preventDefault();
    setIsCreateCompetenceModalVisible(true);
  };

  const showEditCompetenceModal = (e, competence) => {
    e.preventDefault();

    setCompetenceGroup(competence.group);
    getCompetenceNameByGroup(competence.group);
    setCompetenceNameEdit(competence.names);
    setIsEditCompetenceModalVisible(true);
  };

  const hideEditCompetenceModal = (e) => {
    e.preventDefault();
    resetCompetences();
    setIsEditCompetenceModalVisible(false);
  };

  const handleChangeCompetenceName = (e, type) => {
    e.preventDefault();
    if (e.target.value) {
      if (type === "create") {
        setCompetenceName([...competenceName, e.target.value]);
      } else if (type === "edit") {
        setCompetenceNameEdit([...competenceNameEdit, e.target.value]);
      }

      e.target.value = "";
    }
  };

  const handleChangeCompetenceGroup = (e) => {
    e.preventDefault();
    setCompetenceName([]);

    getCompetenceNameByGroup(e.target.value);
    setCompetenceGroup(e.target.value);
  };

  const handleAddCompetence = (e) => {
    e.preventDefault();
    dispatch(setHasChanged(true));

    if (!competenceGroup) {
      setCompetenceGroupError(true);
    }
    if (!competenceName || competenceName.length === 0) {
      setCompetenceNameError(true);
    }

    if (!competenceGroup || !competenceName || competenceName.length === 0) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      competences: [
        ...prev.competences,
        { group: competenceGroup, names: competenceName },
      ],
    }));

    resetCompetences();
    setIsCreateCompetenceModalVisible(false);
  };

  const handleEditCompetence = (e) => {
    e.preventDefault();

    if (!competenceGroup) {
      setCompetenceGroupError(true);
    }
    if (!competenceNameEdit || competenceNameEdit.length === 0) {
      setCompetenceNameEditError(true);
    }

    if (
      !competenceGroup ||
      !competenceNameEdit ||
      competenceNameEdit.length === 0
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      competences: prev.competences.map((competence) => {
        if (competence.group === competenceGroup) {
          return { group: competenceGroup, names: competenceNameEdit };
        }
        return competence;
      }),
    }));

    resetCompetences();
    setIsEditCompetenceModalVisible(false);
  };

  const handleDeleteCompetence = (e) => {
    e.preventDefault();
    resetCompetences();
    setForm((prev) => ({
      ...prev,
      competences: prev.competences.filter(
        (competence) => competence.group !== competenceGroup
      ),
    }));
    setIsEditCompetenceModalVisible(false);
  };

  const resetCompetences = () => {
    console.log("resetCompetences");
    setCompetenceName([]);
    setCompetenceNameEdit([]);
    setCompetenceGroup("");
    setCompetenceNameOption([]);
    setCompetenceGroupError(false);
    setCompetenceNameEditError(false);
    setCompetenceNameError(false);
  };

  const validateNextStep = () => {
    if (currentStep === 1) {
      if (!ebookFile || form.competences.length === 0) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "'E-book file' and 'competences' are required",
            duration: 4000,
          })
        );
        return false;
      }
      return true;
    } else if (currentStep === 2) {
      if (!form.language || !form.ebookType) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "'E-book type' and 'Language' are required",
            duration: 4000,
          })
        );
        return false;
      }

      return true;
    } else if (currentStep === 3) {
      if (!form.ebookTitle) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: "'E-book title' is required",
            duration: 4000,
          })
        );

        return false;
      }
      return true;
    }
  };

  const handleHasChanged = () => {
    dispatch(setHasChanged(true));
  };

  // API CALLS
  const getCompetenceNameByGroup = useMemo(
    () => async (group) => {
      setIsFetchingCompetenceName(true);
      try {
        const response = await fetchCompetenceNameByGroup(group);

        setCompetenceNameOption(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingCompetenceName(false);
      }
    },
    []
  );

  const getCompetencesGroup = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchCompetencesGroup();
      if (response.statusCode !== 200) {
        dispatch(
          showToastWithTimeout({
            type: "danger",
            message: response.message,
            duration: 4000,
          })
        );
      }
      setCompetenceGroupOption(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getCompetencesGroup();
  }, [getCompetencesGroup]);

  useEffect(() => {
    if (competenceGroup) {
      setCompetenceGroupError(false);
    }
    if (competenceName.length > 0) {
      setCompetenceNameError(false);
    }
    if (competenceNameEdit.length > 0) {
      setCompetenceNameEditError(false);
    }
  }, [competenceGroup, competenceName, competenceNameEdit]);

  return (
    <MainLayout>
      {/* Add Competence Modal */}
      {isCreateCompetenceModalVisible && (
        <Modal setShowModal={setIsCreateCompetenceModalVisible}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold text-lg">Tambahkan kompetensi baru</h1>
            <button onClick={() => setIsCreateCompetenceModalVisible(false)}>
              <RiCloseFill className="h-5 w-5 text-neutral-600 hover:text-alert-danger" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <SelectInput
                label="Competence Group"
                id="group"
                value={competenceGroup}
                options={
                  competenceGroupOption
                    ? competenceGroupOption.filter(
                        (option) =>
                          !form.competences.find(
                            (competence) => competence.group === option.label
                          )
                      )
                    : []
                }
                placeholder={"Pilih kelompok kompetensi"}
                handleChange={(e) => {
                  handleChangeCompetenceGroup(e);
                }}
                required
              />
              {competenceGroupError && (
                <p className="text-alert-danger text-xs mt-1">
                  Competence group is required
                </p>
              )}
            </div>
            <div>
              <SelectInput
                id="name"
                label="Competence Name"
                placeholder={
                  isFetchingCompetenceName
                    ? "Loading data..."
                    : "Tambahkan kompetensi"
                }
                options={competenceNameOption.filter(
                  (item) => !competenceName.includes(item.label)
                )}
                handleChange={(e) => {
                  handleChangeCompetenceName(e, "create");
                }}
                disabled={isFetchingCompetenceName}
                multiSelect
                required
              />
              {competenceNameError && (
                <p className="text-alert-danger text-xs mt-1">
                  Competence name is required
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 text-xs mt-1">
              {competenceName.length > 0 &&
                competenceName.map((item, index) => (
                  <div
                    className="px-3 py-1 rounded-full flex gap-1 items-center bg-neutral-200"
                    key={index}
                  >
                    <p>{item}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setCompetenceName(
                          competenceName.filter((name) => name !== item)
                        );
                      }}
                    >
                      <RiCloseFill className="h-3 w-3 text-alert-danger" />
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="p-2 text-sm text-white bg-blue-600 rounded-lg font-medium"
                onClick={(e) => handleAddCompetence(e)}
              >
                Tambahkan
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Competence Modal */}
      {isEditCompetenceModalVisible && (
        <Modal
          setShowModal={setIsEditCompetenceModalVisible}
          onClose={resetCompetences}
        >
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold text-lg">Edit Kompetensi</h1>
            <button onClick={(e) => hideEditCompetenceModal(e)}>
              <RiCloseFill className="h-5 w-5 text-neutral-600 hover:text-alert-danger" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <SelectInput
                label="Competence Group"
                id="group"
                value={competenceGroup}
                options={[{ label: competenceGroup, value: competenceGroup }]}
                handleChange={(e) => {
                  handleChangeCompetenceGroup(e);
                }}
                required
                disabled
              />
              {competenceGroupError && (
                <p className="text-alert-danger text-xs mt-1">
                  Competence group is required
                </p>
              )}
            </div>
            <div>
              <SelectInput
                id="competenceNameEdit"
                label="Competence Name"
                placeholder={
                  isFetchingCompetenceName
                    ? "Loading data..."
                    : "Tambahkan kompetensi"
                }
                options={competenceNameOption.filter(
                  (item) => !competenceNameEdit.includes(item.label)
                )}
                handleChange={(e) => {
                  handleChangeCompetenceName(e, "edit");
                }}
                disabled={isFetchingCompetenceName}
                multiSelect
                required
              />
              {competenceNameEditError && (
                <p className="text-alert-danger text-xs mt-1">
                  Competence name is required
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs mt-1">
              {competenceNameEdit.map((item, index) => (
                <div
                  className="px-3 py-1 rounded-full flex gap-1 items-center bg-neutral-200"
                  key={index}
                >
                  <p>{item}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCompetenceNameEdit(
                        competenceNameEdit.filter((name) => name !== item)
                      );
                    }}
                  >
                    <RiCloseFill className="h-3 w-3 text-alert-danger" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm text-white bg-alert-danger rounded-lg font-medium"
                onClick={(e) => handleDeleteCompetence(e)}
              >
                Remove
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg font-medium"
                onClick={(e) => handleEditCompetence(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isLoading && <Loading />}
      {!isLoading && (
        <ContentLayout>
          <h1 className="text-2xl text-center font-semibold">Insert E-Book</h1>
          <p className="text-center">
            Buat modul pelatihan yang didukung teknologi Artificial Intelligence
            sesuai dengan kebutuhan
          </p>
          <form
            action=""
            className="mt-4 space-y-2"
            onChange={handleHasChanged}
          >
            <div className="w-full flex justify-end">
              <FormStep currentStep={currentStep} totalSteps={totalSteps} />
            </div>
            {currentStep === 1 && (
              <>
                <DragNDropInput
                  stateFile={ebookFile}
                  setStateFile={setEbookFile}
                  id={"ebook-file"}
                  label={"File PDF"}
                  type="pdf"
                  required
                />
                <p className="font-semibold text-sm">
                  Kompetensi <span className="text-alert-danger">*</span>
                </p>
                <div className="p-2 border-2 border-neutral-400 rounded">
                  {!form.competences ||
                    (form.competences.length === 0 && (
                      <div className="flex flex-col items-center text-center text-neutral-400">
                        <p>Belum ada kompetensi</p>
                        <Image
                          src={"/gifs/empty_animation.gif"}
                          alt=""
                          width={200}
                          height={200}
                          unoptimized
                        />
                        <button
                          className="text-blue-600 text-sm"
                          onClick={(e) => showCreateCompetenceModal(e)}
                        >
                          + Tambahkan Kompetensi
                        </button>
                      </div>
                    ))}

                  {form.competences.length > 0 &&
                    form.competences.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-2 border-2 border-neutral-400 rounded text-sm mb-2"
                      >
                        <div className="">
                          <p>
                            <span className="font-medium">
                              Grup Kompetensi:
                            </span>{" "}
                            {item.group}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <p>
                              <span className="font-medium inline-block">
                                Nama Kompetensi:{" "}
                              </span>
                            </p>
                            {item.names.map((name, index) => (
                              <p
                                key={index}
                                className="inline-block text-xs px-3 py-1 bg-neutral-200 rounded-full"
                              >
                                {name}
                              </p>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={(e) => showEditCompetenceModal(e, item)}
                          className="hover:bg-neutral-200 p-1 rounded-md"
                        >
                          <RiEditBoxLine className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  {form.competences.length > 0 && (
                    <button
                      className="text-blue-600 text-sm"
                      onClick={(e) => showCreateCompetenceModal(e)}
                    >
                      + Tambahkan Kompetensi Baru
                    </button>
                  )}
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <SelectInput
                  label="E-Book Type"
                  id="ebookType"
                  handleChange={handleFormChange}
                  value={form.ebookType}
                  options={[
                    { label: "Book", value: "book" },
                    { label: "Journal", value: "journal" },
                    { label: "Paper", value: "paper" },
                  ]}
                  placeholder={"Select E-Book Type"}
                  required
                />
                <SelectInput
                  label="Language"
                  id="language"
                  value={form.language}
                  handleChange={handleFormChange}
                  options={[
                    { label: "Indonesia", value: "id" },
                    { label: "English", value: "en" },
                  ]}
                  placeholder={"Select E-Book Language"}
                  required
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <TextInput
                  label="E-Book Title"
                  id="ebookTitle"
                  handleChange={handleFormChange}
                  value={form.ebookTitle}
                  required
                />
                <TextInput
                  label="Publisher"
                  id="publisher"
                  value={form.publisher}
                  handleChange={handleFormChange}
                />
                <TextInput
                  label="Author"
                  id="author"
                  value={form.author}
                  handleChange={handleFormChange}
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <TextInput
                  label={"Year"}
                  id="yearPublished"
                  value={form.yearPublished}
                  handleChange={handleFormChange}
                  onlyNumber
                  maxLength={4}
                />
                <TextInput
                  label="ISBN"
                  id="isbn"
                  handleChange={handleFormChange}
                  value={form.isbn}
                />
                <TextInput
                  label="DOI"
                  id="doi"
                  handleChange={handleFormChange}
                  value={form.doi}
                />
              </>
            )}

            <div
              className={`pt-3 flex  ${
                currentStep > 1 ? "justify-between" : "justify-end"
              }`}
            >
              {currentStep > 1 && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={(e) =>
                    handleStep(e, currentStep, setCurrentStep, "prev")
                  }
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
                <Link
                  href={"/e-book/1"}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </Link>
              )}
            </div>
          </form>
        </ContentLayout>
      )}
    </MainLayout>
  );
}
