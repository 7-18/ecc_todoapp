import { Op } from "sequelize";
import { Task } from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ statusCode: 201, message: "Task created successfully", data: task });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getTasks = async (req, res) => {
  const { skip, limit, search, sort } = req.query;
  try {
    const tasks = await Task.findAndCountAll({
      where: search
        ? {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        }
        : null,
      where: { status: true },
      order: sort ? [sort.split(":")] : [["priority", "ASC"]],
      offset: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10,
    });
    res
      .status(200)
      .json({ statusCode: 200, message: "List of tasks", data: tasks.rows, total: tasks.count });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      res.status(200).json({ statusCode: 200, message: "Task found", data: task });
    } else {
      res.status(404).json({ statusCode: 404, error: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      res
        .status(200)
        .json({ statusCode: 200, message: "Task updated successfully", data: updatedTask });
    } else {
      res.status(404).json({ statusCode: 404, error: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Task.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      res.status(200).json({
        statusCode: 200,
        message: "Task status updated successfully",
        data: updatedTask,
      });
    } else {
      res.status(404).json({ statusCode: 404, error: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(200).json({ statusCode: 200, message: "Task deleted successfully" });
    } else {
      res.status(404).json({ statusCode: 404, error: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const deleteAllTasks = async (req, res) => {
  const { user_id } = req.params;
  try {
    await Task.destroy({ where: { user_id: user_id } });
    res.status(200).json({ statusCode: 200, message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};
