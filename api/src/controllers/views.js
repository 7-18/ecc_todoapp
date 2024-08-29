import { Op } from "sequelize";
import { CommentUserView, TaskImageUserView, TaskUserView } from "../models/views.js";

export const commentsWithUserData = async (req, res) => {
  const { skip, limit, sort } = req.query;
  const { task_id } = req.params;
  try {
    const commentsWithUserData = await CommentUserView.findAll({
      where: { task_id: task_id },
      order: sort ? [sort.split(":")] : [["comment_createdat", "ASC"]],
      offset: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10,
    });
    res.status(200).json({
      statusCode: 200,
      message: "List of comments",
      data: commentsWithUserData,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
};

export const tasksWithUserData = async (req, res) => {
  const { skip, limit, search, sort } = req.query;
  try {
    const tasksWithUserData = await TaskUserView.findAll({
      where: search
        ? {
          [Op.or]: [
            { task_title: { [Op.like]: `%${search}%` } },
            { task_creator_username: { [Op.like]: `%${search}%` } },
          ],
        }
        : {},
      order: sort ? [sort.split(":")] : [["task_priority", "ASC"]],
      offset: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10,
    });
    res.status(200).json({
      statusCode: 200,
      message: "List of tasks",
      data: tasksWithUserData,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
};

export const tasksImagesWithUserData = async (req, res) => {
  const { sort } = req.query;
  const { user_id } = req.params;
  try {
    const tasksImagesWithUserData = await TaskImageUserView.findAll({
      where: { user_id: user_id },
      order: sort ? [sort.split(":")] : [["task_id", "ASC"]],
    });
    res.status(200).json({
      statusCode: 200,
      message: "List of tasks with images",
      data: tasksImagesWithUserData,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
}

export const tasksImagesWithUsersData = async (req, res) => {
  const { sort } = req.query;
  try {
    const tasksImagesWithUsersData = await TaskImageUserView.findAll({
      order: sort ? [sort.split(":")] : [["task_id", "ASC"]],
    });
    res.status(200).json({
      statusCode: 200,
      message: "List of tasks with images and users",
      data: tasksImagesWithUsersData,
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
}