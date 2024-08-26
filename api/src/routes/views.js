import { Router } from "express";
import {
  commentsWithUserData,
  tasksWithUserData,
} from "../controllers/views.js";

const router = Router();

/**
 * @swagger
 * /api/v1/comments-user-view:
 *   get:
 *     summary: Retrieve a list of comments with user details
 *     tags: [Views]
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

router.get("/comments-user-view", commentsWithUserData);
router.get("/tasks-user-view", tasksWithUserData);

export default router;
