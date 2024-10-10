import { useEffect } from "react";

export default function TextAreaInput({
  value,
  handleChange,
  label,
  id,
  rows = 3,
  required,
}) {
  useEffect(() => {
    if (!handleChange) {
      throw new Error(
        "The 'handleChange' prop is required in InputText component."
      );
    }
    if (!id) {
      throw new Error("The 'id' prop is required in InputText component.");
    }
    if (!label) {
      throw new Error("The 'label' prop is required in InputText component.");
    }
  }, [id, label, handleChange]);

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className="font-semibold">
        {label} {required && <span className="text-alert-danger">*</span>}
      </label>
      <textarea
        name={id}
        id={id}
        rows={rows}
        className="w-full border-2 border-neutral-400 p-2 rounded-lg min-w-72"
        onChange={(e) => handleChange(e)}
        value={value}
      ></textarea>
    </div>
  );
}
