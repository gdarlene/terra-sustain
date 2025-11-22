import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  title: string;
  message: string;
  onAddAnother: () => void;
  onGoHome: () => void;
}

const ResourceSuccessModal: React.FC<Props> = ({ title, message, onAddAnother, onGoHome }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="bg-white shadow-card rounded-xl p-8 max-w-md w-full text-center border border-neutral-300">
        
        <CheckCircleIcon className="w-20 h-20 mx-auto text-primary mb-4" />

        <h1 className="text-3xl font-titles font-semibold text-primary mb-2">
          {title} {message}!
        </h1>

        <p className="text-textColor font-body text-lg mb-6">
          Your {title.toLowerCase()} has been saved.
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={onAddAnother}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-hoverGrays/5 transition"
          >
            Add Another {title}
          </button>

          <button
            onClick={onGoHome}
            className="w-full border border-primary text-primary py-2.5 rounded-lg font-medium hover:bg-primary/30 transition"
          >
            Go Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResourceSuccessModal;