import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { MessageCircle, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

export const ModalComment = ({
  task,
  handleAddComment,
  handleInputChange,
  inputValue,
  handleClickOutside,
  handleDeleteComment,
  comments,
  getComments,
}) => {
  const { user } = useSelector((state) => state.auth);

  const handleDeleteCommentClick = async (id) => {
    try {
      await handleDeleteComment(id);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  useEffect(() => {
    getComments(task.task_id);
  }, [getComments, task.task_id]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-96 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Task Comments</h2>
        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="flex items-start justify-between space-x-2 border-b border-gray-200 pb-2"
            >
              <div className="flex items-start space-x-2 border-b border-gray-200 pb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                  <img
                    src={comment.comment_user_avatar}
                    alt={comment.comment_username}
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">
                    {comment.comment_username}
                  </span>
                  <span className="text-gray-600">{comment.comment_text}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleDeleteCommentClick(comment.comment_id)}
                  className={`p-1 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 hover:text-red-500 ${user.id === comment.user_id ? "" : "hidden"}`}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 border-t border-gray-200 pt-2">
          <Input
            id="comment"
            type="text"
            name="comment"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
          />
          <Button
            onClick={handleAddComment}
            className={`p-2 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${inputValue.length < 6 ? "cursor-not-allowed" : ""}`}
            disabled={inputValue.length < 6}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
