import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Task } from "./task.js";
import { Comment } from "./comment.js";

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: The user ID.
 *       username:
 *         type: string
 *         description: The username.
 *       firstName:
 *         type: string
 *         description: The first name.
 *       lastName:
 *         type: string
 *         description: The last name.
 *       email:
 *         type: string
 *         description: The email.
 *       avatar:
 *         type: string
 *         description: The profile image of the user.
 *       status:
 *         type: boolean
 *         description: The status of the user.
 */

export const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 15],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        isLowercase: true,
        len: [3, 15],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        isLowercase: true,
        len: [3, 15],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
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

User.hasMany(Task, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});
