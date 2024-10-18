export default function FormStep({ currentStep, totalSteps }) {
  const generateSteps = () => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <div
          key={i}
          className={`${
            currentStep === i ? "bg-primary-1" : "bg-neutral-200"
          } h-2 w-8 rounded-full`}
        ></div>
      );
    }

    return steps;
  };

  return (
    <div className="flex flex-col items-end w-full md:w-fit ">
      <p className="text-sm font-medium md:mb-2">
        Step {currentStep}/{totalSteps}
      </p>
      <div className="hidden md:flex gap-2">{generateSteps()}</div>
    </div>
  );
}
