import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, updateTaskStatus, deleteTask, deleteAllTasks } from '../controllers/task.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Task
 */

/**
 * @swagger
 * /api/v1/tasks/save:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete the project"
 *               description:
 *                 type: string
 *                 example: "Finalize the last module of the project"
 *               image:
 *                 type: string
 *               comments:
 *                 type: string
 *                 example: "Don't forget to test all the features"
 *               priority:
 *                 type: integer
 *                 example: 1
 *               statusTask:
 *                 type: string
 *                 example: "In Progress"
 *               status:
 *                 type: boolean
 *                 example: true
 *     required:
 *      - title
 *      - description
 *      - priority
 *      - status
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not created. Please try again
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get a list of tasks
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: skip
 *         type: integer
 *         required: false
 *       - in: query
 *         name: limit
 *         type: integer
 *         required: false
 *       - in: query
 *         name: search
 *         type: string
 *         required: false
 *       - in: query
 *         name: sort
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
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
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not found or does not exist
 */

/**
 * @swagger
 * /api/v1/tasks/update/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete the project"
 *               description:
 *                 type: string
 *                 example: "Finalize the last module of the project"
 *               image:
 *                 type: string
 *               comments:
 *                 type: string
 *                 example: "Don't forget to test all the features"
 *               priority:
 *                 type: string
 *                 example: "High"
 *               statusTask:
 *                 type: string
 *                 example: "In Progress"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not updated. Please try again
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not found or does not exist
 */

/**
 * @swagger
 * /api/v1/tasks/patch/{id}:
 *   patch:
 *     summary: Update task status
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusTask:
 *                 type: string
 *                 example: "In Progress"
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task status not updated. Please try again
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not found or does not exist
 */

/**
 * @swagger
 * /api/v1/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Task not found or does not exist
 */

/**
 * @swagger
 * /api/v1/tasks/deleteAll:
 *   delete:
 *     summary: Delete all tasks
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: All tasks deleted successfully
 *         content:
 *          application/json:
 *           schema:
 *             type: string
 *             example: "All tasks deleted"
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Tasks not deleted. Please try again
 */

router.post('/tasks/save', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/update/:id', updateTask);
router.patch('/tasks/patch/:id', updateTaskStatus);
router.delete('/tasks/delete/:id', deleteTask);
router.delete('/tasks/deleteAll', deleteAllTasks);

export default router;