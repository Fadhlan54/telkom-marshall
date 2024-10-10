import { useEffect } from "react";

export default function TextInput({
  value,
  handleChange,
  label,
  id,
  onlyNumber = false,
  maxLength,
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
        {label} {required && <span className="text-alert-danger">*</span>}{" "}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        className="w-full border-2 border-neutral-400 p-2 rounded-lg"
        onChange={(e) => {
          if (onlyNumber) {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }
          handleChange(e);
        }}
        value={value}
        autoComplete="off"
        maxLength={maxLength || null}
      />
    </div>
  );
}
