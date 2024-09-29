import { useEffect, useRef } from "react";

export default function Modal({ children, setShowModal, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        console.log("closeModal");
        setShowModal(false);
        if (onClose) {
          onClose(); // Panggil onClose setelah modal benar-benar ditutup
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setShowModal, onClose]);

  return (
    <div className="fixed top-0 left-0 z-50  w-full h-full flex flex-col items-center justify-center bg-black/50">
      <div className="w-full max-w-[34rem] py-4 px-6">
        <div className="w-full p-4 bg-white rounded-lg" ref={modalRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
