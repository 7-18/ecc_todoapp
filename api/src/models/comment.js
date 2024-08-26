import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

/**
 * @swagger
 * components:
 *  schemas:
 *   Comment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The comment ID.
 *       text:
 *         type: string
 *         description: The text (message) of the comment.
 *       user_id:
 *         type: integer
 *         description: The user ID.
 *       task_id:
 *         type: integer
 *         description: The task ID.
 */

export const Comment = db.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  },
  {
    timestamps: true,
  }
);
