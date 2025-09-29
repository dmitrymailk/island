import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            // Allow time for fade out animation before calling onClose
            setTimeout(onClose, 300);
        }, 2700);

        return () => clearTimeout(timer);
    }, [onClose]);

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all duration-300 transform";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
    };
    const visibilityClasses = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

    return (
        <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClasses}`}>
            {message}
        </div>
    );
};

export default Toast;
