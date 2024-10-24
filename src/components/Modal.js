import React from 'react';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-red-900 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;