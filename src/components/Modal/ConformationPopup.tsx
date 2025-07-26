import React from "react";

interface ConfirmModalPopupProps {
  show: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  buttonSuccess?: string;
  buttonCancel?: string;
  buttonSuccessClassName?: string;
  buttonCancelClassName?: string;
}

const ConfirmModalPopup: React.FC<ConfirmModalPopupProps> = ({
  show,
  title,
  description,
  onConfirm,
  onCancel,
  buttonSuccess,
  buttonSuccessClassName,
  buttonCancelClassName,
  buttonCancel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-70">
      <div className="relative p-4 w-full max-w-lg">
        <div className="relative bg-white rounded-lg shadow p-3">
          {/* Header */}
          <div className="flex items-center justify-between p-4 rounded-t">
            <div className="w-full text-center">
              <h3 className="text-lg text-gray-700">{title}</h3>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-primary hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Description */}
          <div className="mx-2">
            <p className="text-center text-sm text-gray-600">{description}</p>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-center p-3 mt-2">
            {buttonSuccess && (
              <button
                type="button"
                onClick={onConfirm}
                className={`text-white bg-primary hover:bg-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${buttonSuccessClassName}`}
              >
                {buttonSuccess}
              </button>
            )}
            {buttonCancel && (
              <button
                onClick={onCancel}
                className={`py-2.5 px-5 ms-3 text-sm font-medium bg-gray-300 hover:bg-gray-400 rounded-lg ${buttonCancelClassName}`}
              >
                {buttonCancel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModalPopup;
