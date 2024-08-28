import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentUserView:
 *       type: object
 *       properties:
 *         comment_id:
 *           type: integer
 *           description: The unique identifier for the comment.
 *         comment_text:
 *           type: string
 *           description: The text of the comment.
 *         task_id:
 *           type: integer
 *           description: The ID of the task the comment is associated with.
 *         user_id:
 *           type: integer
 *           description: The ID of the user who made the comment.
 *         comment_username:
 *           type: string
 *           description: The username of the user who made the comment.
 *         comment_user_email:
 *           type: string
 *           description: The email of the user who made the comment.
 *       example:
 *         comment_id: 1
 *         comment_text: "This is a sample comment."
 *         task_id: 101
 *         user_id: 5
 *         comment_username: "john_doe"
 *         comment_user_email: "john_doe@example.com"
 */

export const CommentUserView = db.define(
  "comment_user_view",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    comment_text: {
      type: DataTypes.STRING,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    comment_username: {
      type: DataTypes.STRING,
    },
    comment_user_email: {
      type: DataTypes.STRING,
    },
    comment_user_avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskUserView:
 *       type: object
 *       properties:
 *         task_id:
 *           type: integer
 *           description: The unique identifier for the task.
 *         task_title:
 *           type: string
 *           description: The title of the task.
 *         task_description:
 *           type: string
 *           description: The description of the task.
 *         task_status:
 *           type: boolean
 *           description: The status of the task (true for completed, false for pending).
 *         user_id:
 *           type: integer
 *           description: The ID of the user who created the task.
 *         task_creator_username:
 *           type: string
 *           description: The username of the user who created the task.
 *         task_creator_email:
 *           type: string
 *           description: The email of the user who created the task.
 *       example:
 *         task_id: 101
 *         task_title: "Complete API documentation"
 *         task_description: "Write and finalize the API documentation for the project."
 *         task_status: true
 *         user_id: 5
 *         task_creator_username: "john_doe"
 *         task_creator_email: "john_doe@example.com"
 */

export const TaskUserView = db.define(
  "task_user_view",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    task_title: {
      type: DataTypes.STRING,
    },
    task_description: {
      type: DataTypes.STRING,
    },
    task_status: {
      type: DataTypes.BOOLEAN,
    },
    task_priority: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    task_creator_username: {
      type: DataTypes.STRING,
    },
    task_creator_email: {
      type: DataTypes.STRING,
    },
    task_creator_avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export const TaskImageUserView = db.define(
  "task_image_user_view",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    task_title: {
      type: DataTypes.STRING,
    },
    task_image: {
      type: DataTypes.STRING,
    },
    task_status: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    task_creator_first_name: {
      type: DataTypes.STRING,
    },
    task_creator_last_name: {
      type: DataTypes.STRING,
    },
    task_creator_avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
