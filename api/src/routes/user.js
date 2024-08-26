import { Router } from "express";
import {  createUser,  getUsers,  getUserById,  updateUser,  deleteUser } from "../controllers/user.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /api/v1/users/save:
 *   post:
 *     summary: Create a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@email.com
 *               avatar:
 *                 type: string
 *               status:
 *                 type: boolean
 *     required:
 *      - username
 *      - firstName
 *      - lastName
 *      - email
 *      - status
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not created. Please try again
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get a list of users
 *     tags: [User]
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
 *         description: List of users
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Users not found. Please try again
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Users not found or does not exist
 */

/**
 * @swagger
 * /api/v1/users/update/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
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
 *               username:
 *                 type: string
 *                 example: johndoe
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@email.com
 *               avatar:
 *                 type: string
 *               status:
 *                 type: boolean
 *     required:
 *      - username
 *      - firstName
 *      - lastName
 *      - email
 *      - status
 *     responses:
 *       202:
 *         description: User updated successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       400:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not updated. Please try again
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found or does not exist
 */

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user deleted successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Users not found or does not exist
 */

router.post("/users/save", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser);

export default router;
