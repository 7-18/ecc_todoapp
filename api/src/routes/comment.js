import { Router } from 'express';
import { createComment, getComments, getCommentById, updateComment, deleteComment } from '../controllers/comment.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 */

/**
 * @swagger
 * /api/v1/comments/save:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This is a sample comment"
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               task_id:
 *                 type: integer
 *                 example: 10
 *     required:
 *       - text
 *       - user_id
 *       - task_id
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comment not created. Please try again
 */

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     summary: Get a list of comments
 *     tags: [Comment]
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
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
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
 * /api/v1/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comment not found or does not exist
 */

/**
 * @swagger
 * /api/v1/comments/update/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comment]
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
 *               text:
 *                 type: string
 *                 example: "This is an updated comment"
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               task_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comment not updated. Please try again
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comment not found or does not exist
 */

/**
 * @swagger
 * /api/v1/comments/delete/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *          application/json:
 *           schema:
 *             type: string
 *             example: Comment deleted successfully
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Comment not found or does not exist
 */


router.post('/comments/save', createComment);
router.get('/comments', getComments);
router.get('/comments/:id', getCommentById);
router.put('/comments/update/:id', updateComment);
router.delete('/comments/delete/:id', deleteComment);

export default router;