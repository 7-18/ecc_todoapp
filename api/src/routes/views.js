import { Router } from "express";
import {
  commentsWithUserData,
  tasksImagesWithUserData,
  tasksImagesWithUsersData,
  tasksWithUserData,
} from "../controllers/views.js";

const router = Router();

/**
 * @swagger
 * /api/v1/comments-user-view/{task_id}:
 *   get:
 *     summary: Retrieve a list of comments with user details
 *     tags: [Views]
 *     parameters:
 *       - in: path
 *         name: task_id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: A list of comments with user data
 *         content:
 *          application/json:
 *           schema:
 *             type: string
 *             example: "List of comments"
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comments not found. Please try again
 */

/**
 * @swagger
 * /api/v1/tasks-user-view:
 *   get:
 *     summary: Retrieve a list of tasks with user details
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: A list of tasks with user data
 *         content:
 *          application/json:
 *           schema:
 *             type: string
 *             example: "List of tasks"
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Tasks not found. Please try again
 */

/**
 * @swagger
 * /api/v1/tasks-images-user-view/{user_id}:
 *   get:
 *     summary: Retrieve a list of tasks with user details and images
 *     tags: [Views]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         type: integer
 *         required: true
 *       - in: query
 *         name: sort
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: A list of tasks with user data and images
 *         content:
 *          application/json:
 *           schema:
 *             type: string
 *             example: "List of tasks"
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Tasks not found. Please try again
 */

router.get("/comments-user-view/:task_id", commentsWithUserData);
router.get("/tasks-user-view", tasksWithUserData);
router.get("/tasks-images-user-view/:user_id", tasksImagesWithUserData);
router.get("/tasks-images-users-view", tasksImagesWithUsersData);

export default router;
