import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export function Alert({ type, message }) {
  const [show, setShow] = useState(true);

  const getAlertStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      default:
        return "bg-gray-100 border-gray-400 text-gray-700";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  setTimeout(() => {
    setShow(false);
  }, 2000);

  if (!show) {
    return null;
  }

  return (
    <div
      className={`border-l-4 p-4 ${getAlertStyle()} absolute top-0 right-0 mt-4 mr-4`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
