import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="p-6 pt-8">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
