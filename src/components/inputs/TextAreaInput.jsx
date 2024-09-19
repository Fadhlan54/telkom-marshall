import { useEffect } from "react";

export default function TextAreaInput({
  stateValue,
  setStateValue,
  label,
  id,
  rows = 3,
  required,
}) {
  useEffect(() => {
    if (!setStateValue && setStateValue !== "") {
      throw new Error(
        "The 'setStateValue' prop is required in InputText component."
      );
    }
    if (!id) {
      throw new Error("The 'id' prop is required in InputText component.");
    }
    if (!label) {
      throw new Error("The 'label' prop is required in InputText component.");
    }
  }, [setStateValue, id, label]);

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <textarea
        name={id}
        id={id}
        rows={rows}
        className="w-full border-2 border-neutral-400 p-2 rounded-lg"
        onChange={(e) => setStateValue(e.target.value)}
        value={stateValue}
      ></textarea>
    </div>
  );
}
