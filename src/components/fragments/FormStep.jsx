export default function FormStep({ currentStep, totalSteps }) {
  const generateSteps = () => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <div
          key={i}
          className={`${
            currentStep === i ? "bg-neutral-400" : "bg-neutral-200"
          } h-2 w-8 rounded-full`}
        ></div>
      );
    }

    return steps;
  };

  return (
    <div className="flex flex-col items-end">
      <p className="text-sm font-medium mb-2">
        Step {currentStep}/{totalSteps}
      </p>
      <div className="flex gap-2">{generateSteps()}</div>
    </div>
  );
}
