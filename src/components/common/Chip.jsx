import { RiCloseFill } from "react-icons/ri";

export default function Chip({ children, onClose }) {
  return (
    <div className="px-2.5 py-1 rounded-full flex gap-1 items-center bg-soft-1 border border-primary-1 text-primary-1 text-xs">
      {children}

      {onClose && (
        <button onClick={onClose}>
          <RiCloseFill className="h-3.5 w-3.5 text-alert-danger hover:text-alert-danger-2" />
        </button>
      )}
    </div>
  );
}
