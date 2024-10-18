"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import TextInput from "../inputs/TextInput";
import JoditEditor from "jodit-react";
import {
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import Button from "../common/Button";
import Modal from "../modals/Modal";
import ConfirmModal from "../modals/ConfirmModal";

export default function EditorContentForm() {
  const subTopicInputRef = useRef(null);
  const subTopicOptionRef = useRef(null);
  const textareaRef = useRef(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [searchSubTopic, setSearchSubTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [showSelectTopic, setShowSelectTopic] = useState(false);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [data, setData] = useState([
    {
      topic: "Test Topic 1",
      subTopic: [
        { name: "Topic 1 Subtopic 1", content: "Test content 1" },
        { name: "Topic 1 Subtopic 2", content: "Test content 2" },
      ],
    },
    {
      topic: "Test Topic 2",
      subTopic: [
        { name: "Topic 2 Subtopic 1", content: "Test content 3" },
        { name: "Topic 2 Subtopic 2", content: "Test content 4" },
        { name: "Topic 2 Subtopic 3", content: "Test content 5" },
      ],
    },
  ]);

  useEffect(() => {
    const handleShowSelectTopic = (event) => {
      if (
        (subTopicInputRef.current &&
          subTopicInputRef.current === event.target) ||
        (subTopicOptionRef.current &&
          subTopicOptionRef.current.contains(event.target))
      ) {
        setShowSelectTopic(true);
      } else {
        setShowSelectTopic(false);
      }
    };

    document.addEventListener("click", handleShowSelectTopic);
    return () => {
      document.removeEventListener("click", handleShowSelectTopic);
    };
  }, []);

  const config = useMemo(
    () => ({
      style: { "font-size": "0.875rem" },
      readonly: false,
      placeholder: "Select sub-topic to edit content",
      toolbarAdaptive: false,
      disablePlugins: "powered-by-jodit,add-new-line",
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "table",
        "|",
        "indent",
        "outdent",
        "align",
        "|",
        "undo",
        "redo",
      ],
    }),
    []
  );

  const saveContentToSubTopic = (newContent) => {
    console.log("==========test");
    console.log(newContent);
    if (selectedSubTopic) {
      setData((prevData) =>
        prevData.map((topic) => ({
          ...topic,
          subTopic: topic.subTopic.map((subItem) =>
            subItem.name === selectedSubTopic.name
              ? { ...subItem, content: newContent }
              : subItem
          ),
        }))
      );
    }
  };

  const filterSubTopics = (data, searchTerm) => {
    return data
      .map((item, index) => {
        const filteredSubTopics = item.subTopic
          .map((subItem, _index) => ({
            ...subItem,
            subTopicIndex: _index,
          }))
          .filter((subItem) =>
            `${index + 1} ${item.topic}.${index + 1}.${
              subItem.subTopicIndex + 1
            } ${subItem.name}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        if (filteredSubTopics.length > 0) {
          return { ...item, topicIndex: index, subTopic: filteredSubTopics };
        }
        return null;
      })
      .filter((item) => item !== null);
  };

  const handleSubTopicSelect = (subTopic) => {
    if (selectedSubTopic) {
      saveContentToSubTopic(content);
    }
    setSelectedSubTopic(subTopic);
    setSearchSubTopic(subTopic.name);
    setContent(subTopic.content);
    setShowSelectTopic(false);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const filteredData = filterSubTopics(data, searchSubTopic);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.style.maxHeight = `200px`;
    }
  }, [message]);

  return (
    <div>
      {/* {showConfirmModal && (
        <Modal setShowModal={setShowConfirmModal}>
          <div className="flex items-center justify-center flex-col">
            <RiErrorWarningLine className="w-14 h-14 text-alert-warning" />
            <h3 className="mt-3 text-2xl font-semibold ">Are you sure?</h3>
            <p className="mt-1">Save your content and convert it to PPT?</p>
            <div className="flex justify-center mt-4 gap-2">
              <Button
                variant="danger"
                size="lg"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" size="lg" href={"/module/1"}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )} */}
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          text={"Save your content and convert it to PPT?"}
          href={"/module/1"}
        />
      )}
      <form>
        <h3 className="text-center font-semibold text-2xl mb-4">
          Content Adjustment
        </h3>
        <div className="relative mb-6">
          <TextInput
            id="subTopic"
            value={searchSubTopic}
            handleChange={(e) => setSearchSubTopic(e.target.value)}
            placeholder="Choose your subtopic"
            label="Subtopic"
            ref={subTopicInputRef}
          />
          {searchSubTopic && (
            <button
              className="absolute right-2 top-1/2 text-alert-danger hover:text-alert-danger-2 focus:text-alert-danger-3"
              onClick={(e) => {
                e.preventDefault();
                setSearchSubTopic("");
              }}
            >
              <RiCloseCircleLine className="w-6 h-6" />
            </button>
          )}
          {showSelectTopic && (
            <div
              className="absolute w-full border rounded-md bg-white -bottom-1.5 translate-y-full shadow-xl z-10 max-h-52 overflow-auto"
              ref={subTopicOptionRef}
            >
              {filteredData.length > 0 ? (
                <ul className="py-2">
                  {filteredData.map((item, index) => (
                    <li key={item.topicIndex}>
                      <p className="font-medium text-xs text-gray-600  px-4 py-2">
                        <span className="font-bold mr-2 text-grey-4">
                          {item.topicIndex + 1}
                        </span>{" "}
                        {item.topic}
                      </p>
                      <ul
                        className={`text-sm ${
                          filteredData.length !== item.topicIndex + 1
                            ? "border-b pb-1 mb-1"
                            : ""
                        }`}
                      >
                        {item.subTopic.map((subItem) => (
                          <li
                            key={subItem.name}
                            className="py-1 hover:bg-gray-100 px-4 cursor-pointer text-gray-800 mb-1"
                            onClick={() => handleSubTopicSelect(subItem)}
                          >
                            <span className="font-medium mr-2 text-grey-4">{`${
                              item.topicIndex + 1
                            }.${subItem.subTopicIndex + 1}`}</span>{" "}
                            {`${subItem.name}`}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className=" text-grey-4 p-4 text-sm">No options</p>
              )}
            </div>
          )}
        </div>
        {selectedSubTopic && (
          <div className="flex items-center gap-2 mb-4">
            <p className="font-semibold">{selectedSubTopic?.name}</p>
          </div>
        )}
        <JoditEditor
          ref={editor}
          value={content}
          onBlur={handleContentChange}
          config={config}
          className="mt-2"
        />
        <div className="mt-4">
          <label htmlFor="regenerateContent" className="font-semibold text-sm">
            Regenerate content with AI
          </label>
          <p className="text-xs text-grey-3 mb-2">
            If the content above requires adjustments, please prompt AI to
            suggest necessary revisions
          </p>
          <div
            className={`flex items-center gap-2 border-2  rounded-lg p-1 ps-2 text-sm ${
              isTextAreaFocused ? "border-primary-1" : "border-neutral-400"
            }`}
          >
            <textarea
              id="regenerateContent"
              className="w-full resize-none overflow-y-auto border-none outline-none"
              rows={1}
              ref={textareaRef}
              value={message}
              placeholder="Enter your prompt here"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsTextAreaFocused(true)}
              onBlur={() => setIsTextAreaFocused(false)}
            />
            <button className="bg-primary-1 hover:bg-primary-2 focus:bg-primary-3 text-white px-2 py-2 rounded-lg self-end">
              <RiSendPlaneFill className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary" onClick={() => setShowConfirmModal(true)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
