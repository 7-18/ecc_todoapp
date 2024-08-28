import { Op } from "sequelize";
import { CommentUserView, TaskUserView } from "../models/views.js";

export const commentsWithUserData = async (req, res) => {
  const { skip, limit, sort } = req.query;
  try {
    const commentsWithUserData = await CommentUserView.findAll({
      order: sort ? [sort.split(":")] : [["comment_createdat", "DESC"]],
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
