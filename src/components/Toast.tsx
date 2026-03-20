import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast = ({ message, show, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{
        backgroundColor: '#C8832A',
        color: 'white',
        borderRadius: '8px',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(200, 131, 42, 0.3)'
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
