import { useEffect } from "react";

export default function SelectInput({
  stateValue,
  setStateValue,
  label,
  id,
  options = [],
  required = false,
}) {
  useEffect(() => {
    if (!stateValue && stateValue !== null) {
      throw new Error(
        "The 'stateValue' prop is required in SelectInput component."
      );
    }
    if (!setStateValue) {
      throw new Error(
        "The 'setStateValue' prop is required in SelectInput component."
      );
    }
    if (!id) {
      throw new Error("The 'id' prop is required in SelectInput component.");
    }
    if (!label) {
      throw new Error("The 'label' prop is required in SelectInput component.");
    }
  });
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor="competence-level" className="font-semibold">
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <select
        name="competence-level"
        id="competence-level"
        className="w-full border-2 border-neutral-400 p-2 rounded-lg"
      >
        <option value="1">Kompetensi 1</option>
        <option value="2">Kompetensi 2</option>
        <option value="3">Kompetensi 3</option>
      </select>
    </div>
  );
}
