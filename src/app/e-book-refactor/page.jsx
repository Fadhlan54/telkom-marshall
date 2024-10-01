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
import { useCallback, useEffect, useState } from "react";
import { RiCloseFill, RiEditBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showToastWithTimeout } from "@/lib/slices/toastSlice";
import Loading from "@/components/common/Loading";

export default function Ebook() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ebookFile: null,
    competences: [],
    competenceGroup: "",
    competenceName: [],
    competenceNameEdit: [],
    ebookType: "",
    language: "",
    ebookTitle: "",
    publisher: "",
    author: "",
    yearPublished: "",
    isbn: "",
    doi: "",
  });

  const [selectOptions, setSelectOptions] = useState({
    competencesGroup: [],
    competencesName: [],
    competencesNameEdit: [],
  });

  const [uiState, setUiState] = useState({
    currentStep: 1,
    isCreateCompetenceModalVisible: false,
    isEditCompetenceModalVisible: false,
    isLoading: false,
    isFetchingCompetenceName: false,
    errors: {
      competenceGroup: false,
      competenceName: false,
      competenceNameEdit: false,
    },
  });

  const toggleModalVisiblity = (modal, isVisible) => {
    switch (modal) {
      case "create":
        setUiState({
          ...uiState,
          isCreateCompetenceModalVisible: isVisible,
        });
        break;
      case "edit":
        setUiState({
          ...uiState,
          isEditCompetenceModalVisible: isVisible,
        });
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleAddCompetence2 = (e) => {
    if (!formData.competenceGroup || !formData.competenceName.length) {
      setUiState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          competenceGroup: !formData.competenceGroup,
          competenceName: !formData.competenceName.length,
        },
      }));

      return;
    }

    setFormData({
      ...formData,
      competences: [
        ...formData.competences,
        {
          group: formData.competenceGroup,
          names: formData.competenceName,
        },
      ],
      competenceGroup: "",
      competenceName: [],
    });
  };

  const resetCompetences2 = () => {
    setFormData({
      ...formData,
      competenceGroup: "",
      competenceName: [],
      competenceNameEdit: [],
    });
  };

  const handleCompetenceChange = (actionType) => {
    const isEditValid =
      formData.competenceGroup && formData.competenceNameEdit.length;
    setUiState((prevState) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        competenceGroup: !formData.competenceGroup,
        competenceNameEdit: !formData.competenceNameEdit.length,
      },
    }));

    if (!isEditValid) return;

    const updatedCompetences = formData.competences.map((competence) => {
      if (competence.group === formData.competenceGroup) {
        return {
          group: formData.competenceGroup,
          names: formData.competenceNameEdit,
        };
      }
      return competence;
    });

    if (actionType === "edit") {
      setFormData((prevState) => ({
        ...prevState,
        competences: updatedCompetences,
      }));
    } else if (actionType === "delete") {
      setFormData((prevState) => ({
        ...prevState,
        competences: prevState.competences.filter(
          (competence) => competence.group !== formData.competenceGroup
        ),
      }));
    }
  };

  const getCompetenceGroup = useCallback(async () => {
    try {
      setUiState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await fetchCompetencesGroup();
      setUiState((prevState) => ({
        ...prevState,
        isLoading: false,
        competenceGroupOption: response.data || [],
      }));
    } catch (error) {
      dispatch(
        showToastWithTimeout({
          type: "danger",
          message: error.message,
          duration: 4000,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    getCompetenceGroup();
  }, [getCompetenceGroup]);

  useEffect(() => {
    if (formData.competenceGroup) {
      setUiState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          competenceGroup: false,
        },
      }));
    }

    if (formData.competenceNameEdit.length) {
      setUiState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          competenceNameEdit: false,
        },
      }));
    }

    if (formData.competenceName.length) {
      setUiState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          competenceName: false,
        },
      }));
    }
  }, [
    formData.competenceGroup,
    formData.competenceName,
    formData.competenceNameEdit,
  ]);

  const [competenceGroup, setCompetenceGroup] = useState("");
  const [competenceName, setCompetenceName] = useState([]);
  const [competenceNameEdit, setCompetenceNameEdit] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [competenceNameOption, setCompetenceNameOption] = useState([]);
  const [competenceGroupOption, setCompetenceGroupOption] = useState([]);

  const [ebookType, setEbookType] = useState("");
  const [language, setLanguage] = useState("");
  const [ebookTitle, setEbookTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [isbn, setIsbn] = useState("");
  const [doi, setDoi] = useState("");
  const [ebookFile, setEbookFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreateCompetenceModalVisible, setIsCreateCompetenceModalVisible] =
    useState(false);
  const [isEditCompetenceModalVisible, setIsEditCompetenceModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [competenceGroupError, setCompetenceGroupError] = useState(false);
  const [competenceNameError, setCompetenceNameError] = useState(false);
  const [competenceNameEditError, setCompetenceNameEditError] = useState(false);
  const [isFetchingCompetenceName, setIsFetchingCompetenceName] =
    useState(false);

  const totalSteps = 4;

  function showCreateCompetenceModal(e) {
    e.preventDefault();
    setIsCreateCompetenceModalVisible(true);
  }

  function showEditCompetenceModal(e, competence) {
    e.preventDefault();

    setCompetenceGroup(competence.group);
    setCompetenceNameEdit(competence.names);
    setIsEditCompetenceModalVisible(true);
  }

  function hideEditCompetenceModal(e) {
    e.preventDefault();
    resetCompetences();
    setIsEditCompetenceModalVisible(false);
  }

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

    if (!competenceGroup) {
      setCompetenceGroupError(true);
    }
    if (!competenceName || competenceName.length === 0) {
      setCompetenceNameError(true);
    }

    if (!competenceGroup || !competenceName || competenceName.length === 0) {
      return;
    }

    setCompetences([
      ...competences,
      { group: competenceGroup, names: competenceName },
    ]);
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

    setCompetences(
      competences.map((competence) => {
        if (competence.group === competenceGroup) {
          return { group: competenceGroup, names: competenceNameEdit };
        }
        return competence;
      })
    );
    resetCompetences();
    setIsEditCompetenceModalVisible(false);
  };

  const handleDeleteCompetence = (e) => {
    e.preventDefault();
    resetCompetences();
    setCompetences(
      competences.filter((competence) => competence.group !== competenceGroup)
    );
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
      if (!ebookFile || competences.length === 0) {
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
      if (!language || !ebookType) {
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
      if (!ebookTitle) {
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

  const getCompetenceNameByGroup = async (group) => {
    setIsFetchingCompetenceName(true);
    try {
      const response = await fetchCompetenceNameByGroup(group);

      setCompetenceNameOption(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingCompetenceName(false);
    }
  };

  useEffect(() => {
    const getCompetencesGroup = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
      setCompetenceGroupOption(response.data);
    };
    getCompetencesGroup();
  }, [dispatch]);

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
        <Modal setShowModal={() => toggleModalVisiblity("create", false)}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-semibold text-lg">Tambahkan kompetensi baru</h1>
            <button onClick={() => toggleModalVisiblity("create", false)}>
              <RiCloseFill className="h-5 w-5 text-neutral-600 hover:text-alert-danger" />
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <SelectInput
                label="Competence Group"
                id="group"
                options={
                  competenceGroupOption
                    ? competenceGroupOption.filter(
                        (item) =>
                          !competences.find(
                            (competence) => competence.group === item.label
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
                label="Competence Name"
                id="name"
                setStateValue={setCompetenceName}
                options={competenceNameOption.filter(
                  (item) => !competenceName.includes(item.label)
                )}
                placeholder={"Tambahkan kompetensi"}
                handleChange={(e) => {
                  handleChangeCompetenceName(e, "create");
                }}
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
          setCompetences={setCompetences}
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
                setStateValue={setCompetenceGroup}
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
                label="Competence Name"
                id="name"
                setStateValue={setCompetenceNameEdit}
                options={competenceNameOption.filter(
                  (item) => !competenceNameEdit.includes(item.label)
                )}
                placeholder={"Tambahkan kompetensi"}
                handleChange={(e) => {
                  handleChangeCompetenceName(e, "edit");
                }}
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
          <form action="" className="mt-4 space-y-2">
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
                  {!competences ||
                    (competences.length === 0 && (
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

                  {competences.length > 0 &&
                    competences.map((item, index) => (
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
                  {competences.length > 0 && (
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
                  id="type"
                  setStateValue={setEbookType}
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
                  setStateValue={setLanguage}
                  options={[
                    { label: "Indonesia", value: "id" },
                    { label: "English", value: "en" },
                  ]}
                  required
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <TextInput
                  label="E-Book Title"
                  id="title"
                  setStateValue={setEbookTitle}
                  stateValue={ebookTitle}
                  required
                />
                <TextInput
                  label="Publisher"
                  id="publisher"
                  stateValue={publisher}
                  setStateValue={setPublisher}
                />
                <TextInput
                  label="Author"
                  id="author"
                  stateValue={author}
                  setStateValue={setAuthor}
                />
              </>
            )}

            {currentStep === 4 && (
              <>
                <TextInput
                  label={"Year"}
                  id="year"
                  stateValue={yearPublished}
                  setStateValue={setYearPublished}
                  onlyNumber
                  maxLength={4}
                />
                <TextInput label="ISBN" id="isbn" setStateValue={setIsbn} />
                <TextInput label="DOI" id="doi" setStateValue={setDoi} />
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
