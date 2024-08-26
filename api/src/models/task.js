import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Comment } from "./comment.js";

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The task ID.
 *       title:
 *         type: string
 *         description: The title of the task.
 *       description:
 *         type: string
 *         description: The description of the task.
 *       priority:
 *         type: integer
 *         description: The priority of the task.
 *       image:
 *         type: string
 *         description: Base64 of the image of the task.
 *       user_id:
 *         type: integer
 *         description: The user ID.
 *       status:
 *         type: boolean
 *         description: The status of the task.
 */

export const Task = db.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50],
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100],
        notEmpty: true,
      },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 3,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    statusTask: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["pending", "in progress", "completed"]],
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Task.hasMany(Comment, {
  foreignKey: "task_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Task, {
  foreignKey: "task_id",
});
