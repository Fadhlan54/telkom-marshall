"use client";

import DragNDropInput from "@/components/inputs/DragNDropInput";
import SelectInput from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import CreateLayout from "@/components/layouts/CreateLayout";
import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";

export default function Ebook() {
  const [competenceGroup, setCompetenceGroup] = useState("");
  const [competenceName, setCompetenceName] = useState("");
  const [ebookType, setEbookType] = useState("");
  const [language, setLanguage] = useState("");
  const [ebookTitle, setEbookTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [isbn, setIsbn] = useState("");
  const [doi, setDoi] = useState("");
  const [ebookFile, setEbookFile] = useState(null);
  return (
    <MainLayout>
      <CreateLayout>
        <h1 className="text-2xl text-center font-semibold">Insert E-Book</h1>
        <p className="text-center">
          Buat modul pelatihan yang didukung teknologi Artificial Intelligence
          sesuai dengan kebutuhan
        </p>
        <form action="" className="mt-4 space-y-2">
          <SelectInput
            label="Competence Group"
            id="group"
            setStateValue={setCompetenceGroup}
            options={[
              { label: "group1", value: "group1" },
              { label: "group2", value: "group2" },
              { label: "group3", value: "group3" },
            ]}
            required
          />
          <SelectInput
            label="Competence Name"
            id="name"
            setStateValue={setCompetenceName}
            options={[
              { label: "name1", value: "name1" },
              { label: "name2", value: "name2" },
              { label: "name3", value: "name3" },
            ]}
            required
          />
          <SelectInput
            label="E-Book Type"
            id="type"
            setStateValue={setEbookType}
            options={[
              { label: "Journal", value: "journal" },
              { label: "Book", value: "book" },
            ]}
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
          <DragNDropInput
            stateFile={ebookFile}
            setStateFile={setEbookFile}
            id={"ebook-file"}
            label={"File PDF"}
            type="pdf"
            required
          />
        </form>
      </CreateLayout>
    </MainLayout>
  );
}
