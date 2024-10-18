import { RiCheckFill } from "react-icons/ri";

export default function Stepper({ currentStep, setCurrentStep, items = [] }) {
  const generateSteps = () => {
    const steps = [];

    const handleClick = (e, i) => {
      e.preventDefault();
      if (setCurrentStep && i < currentStep) {
        setCurrentStep(i);
      }
    };

    items.forEach((item, index) => {
      steps.push(
        <>
          <div className="flex flex-col items-center gap-1 relative">
            <button
              className={`w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center border-2  font-medium ${
                currentStep === index + 1
                  ? "border-primary-1 text-primary-1"
                  : currentStep > index + 1
                  ? "bg-primary-1 text-white border-primary-1"
                  : " border-neutral-400"
              }`}
              onClick={(e) => handleClick(e, index + 1)}
            >
              {currentStep > index + 1 ? (
                <RiCheckFill className="w-6 h-6" />
              ) : (
                index + 1
              )}
            </button>
            <p className="text-center text-xs sm:text-[0.8rem] font-medium absolute -bottom-1 translate-y-full">
              {item}
            </p>
          </div>
          {index !== items.length - 1 && (
            <div
              className={`flex-grow border-t-2  ${
                currentStep > index + 1
                  ? "border-primary-1"
                  : "border-neutral-400"
              }`}
            />
          )}
        </>
      );
    });

    return steps;
  };
  return (
    <div className="flex items-center text-sm mb-12 px-4">
      <div className="flex items-center w-full">{generateSteps()}</div>
    </div>
  );
}
