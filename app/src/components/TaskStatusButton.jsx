import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { useSelector } from "react-redux";

export const TaskStatusButton = ({ task, statusLabels, onStatusChange }) => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.task_id, newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const completedClass = "bg-green-500 text-green-50 hover:bg-green-600";
  const inProgressClass = "bg-yellow-500 text-yellow-50 hover:bg-yellow-600";
  const pendingClass = "bg-red-500 text-red-50 hover:bg-red-600";

  return (
    <div className="relative" ref={dropdownRef}>
      {user.id === task.user_id ? (
        <Button
          className={`flex items-center mt-2 px-2 py-1 text-xs font-semibold rounded-full ${task.task_status === "completed" ? completedClass : task.task_status === "in progress" ? inProgressClass : pendingClass}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {task.task_status}
        </Button>
      ) : (
        <Button
          className={`cursor-default flex items-center mt-2 px-2 py-1 text-xs font-semibold rounded-full ${task.task_status === "completed" ? completedClass : task.task_status === "in progress" ? inProgressClass : pendingClass}`}
        >
          {task.task_status}
        </Button>
      )}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {statusLabels.map((status) => (
            <Button
              key={status}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleStatusChange(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
