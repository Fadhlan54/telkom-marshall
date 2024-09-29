export default function handleStep(
  e,
  currentStep,
  setCurrentStep,
  type,
  validation
) {
  e.preventDefault();
  if (type === "next") {
    if (validation) {
      if (!validation()) {
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  } else if (type === "prev") {
    setCurrentStep(currentStep - 1);
  }
}
