import { RiErrorWarningLine } from "react-icons/ri";
import Modal from "./Modal";
import Button from "../common/Button";

export default function ConfirmModal({
  header,
  text,
  setShowModal,
  onConfirm,
  href,
}) {
  return (
    <Modal setShowModal={setShowModal}>
      <div className="flex items-center justify-center flex-col">
        <RiErrorWarningLine className="w-14 h-14 text-alert-warning" />
        <h3 className="mt-3 text-2xl font-semibold ">
          {header || "Are you sure?"}
        </h3>
        <p className="mt-1">{text || "You won't be able to revert this!"}</p>
        <div className="flex justify-center mt-4 gap-2">
          <Button
            variant="danger"
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          {href ? (
            <Button variant="primary" size="lg" href={href}>
              Save
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={onConfirm}>
              Save
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
