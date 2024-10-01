import { useEffect } from "react";

export default function TextInput({
  stateValue,
  setStateValue,
  label,
  id,
  onlyNumber = false,
  maxLength,
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

  const handleChange = (e) => {
    const { value } = e.target;

    if (maxLength && value.length > maxLength) {
      return;
    }

    if (onlyNumber && !/^\d+$/.test(value) && value !== "") {
      return;
    }

    setStateValue(value);
  };

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
        onChange={(e) => handleChange(e)}
        value={stateValue}
        autoComplete="off"
      />
    </div>
  );
}
