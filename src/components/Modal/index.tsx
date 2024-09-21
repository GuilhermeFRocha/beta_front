import { CircleX } from "lucide-react";
import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
}

const Modal = ({ isOpen, onClose, title, onSubmit }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <CircleX className="w-6 h-6" />
        </Button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h2>

        <div className="flex justify-center space-x-4">
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 max-w-28"
            onClick={onSubmit}
          >
            Sim
          </Button>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 max-w-28"
            onClick={onClose}
          >
            Não
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
