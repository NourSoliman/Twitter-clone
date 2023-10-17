import React from "react";
interface confirm {
    isOpen?: boolean,
    postId?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
}
const ConfirmationDialog: React.FC<confirm> = ({ isOpen, onConfirm, onCancel, postId }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-lg text-black mb-4">Are you sure you want to delete this post?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
