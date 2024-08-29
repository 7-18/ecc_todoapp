import { useEffect, useState } from "react";
import { TaskStatusButton } from "./TaskStatusButton";
import { Trash2, MessageSquareMore } from "lucide-react";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { ModalComment } from "./ModalComment";
import { ModalProfile } from "./ModalProfile"; // Importa el modal de perfil
import { getCommentsUserView } from "../services/httpClient";

export const TaskByUserList = ({
  tasks,
  statusLabels,
  handleToggleTask,
  handleDeleteTask,
  handleAddComment,
  handleDeleteComment,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [commentText, setCommentText] = useState("");

  const handleOpenCommentModal = (task) => {
    setSelectedTask(task);
    setIsCommentModalOpen(true);
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCommentModalInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentModalAddComment = (e) => {
    e.preventDefault();
    if (selectedTask && commentText) {
      handleAddComment(selectedTask.task_id, commentText);
      getComments(selectedTask.task_id);
      setCommentText("");
    }
  };

  const handleCommentModalDeleteComment = (commentId) => {
    handleDeleteComment(commentId);
    getComments(selectedTask.task_id);
  };

  const handleClickOutside = () => {
    setIsCommentModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const [comments, setComments] = useState([]);

  const getComments = async (task_id) => {
    try {
      const response = await getCommentsUserView(task_id);
      setComments(response.data);
    } catch (error) {
      console.error("Error getting comments: ", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {tasks.map((task, i) => (
        <div
          key={i}
          className="flex flex-col py-2 bg-white rounded-lg shadow-md"
        >
          <div className="flex items-center mt-2 px-4">
            <TaskStatusButton
              task={task}
              statusLabels={statusLabels}
              onStatusChange={handleToggleTask}
            />
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-gray-500 text-sm ml-auto capitalize">
                {task.task_creator_first_name} {task.task_creator_last_name}
              </span>
              <img
                src={task.task_creator_avatar}
                alt={task.task_creator_first_name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
                }}
                loading="lazy"
                className={`h-8 w-8 rounded-full ml-auto border-2 hover:scale-105 transition duration-300 ${user.id === task.user_id ? "cursor-pointer" : ""}`}
                onClick={
                  user.id === task.user_id ? handleOpenProfileModal : null
                }
              />
            </div>
          </div>
          <img
            src={task.task_image}
            alt={task.task_title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
            }}
            loading="lazy"
            className="h-36 object-fill mt-2 hover:scale-105 transition-transform duration-300"
          />
          <div className="flex pt-2 items-center justify-between px-4">
            <h4 className="text-gray-800 text-lg font-semibold">
              {task.task_title}
            </h4>
            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={() => handleOpenCommentModal(task)}
                className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
              >
                <MessageSquareMore className="h-3 w-3" />
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.task_id)}
                className={`p-1 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 hover:text-red-500 ${
                  user.id === task.user_id ? "" : "hidden"
                }`}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {isCommentModalOpen && (
        <ModalComment
          task={selectedTask}
          handleAddComment={handleCommentModalAddComment}
          handleInputChange={handleCommentModalInputChange}
          inputValue={commentText}
          handleClickOutside={handleClickOutside}
          handleDeleteComment={handleCommentModalDeleteComment}
          comments={comments}
          getComments={getComments}
        />
      )}

      {isProfileModalOpen && (
        <ModalProfile handleClickOutside={handleClickOutside} />
      )}
    </div>
  );
};
