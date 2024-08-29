import { Op } from "sequelize";
import { Comment } from "../models/comment.js";

export const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res
      .status(201)
      .json({
        statusCode: 201,
        message: "Comment created successfully",
        data: comment,
      });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getComments = async (req, res) => {
  const { skip, limit, search } = req.query;
  try {
    const comments = await Comment.findAndCountAll({
      where: search
        ? {
            [Op.or]: [{ comment: { [Op.iLike]: `%${search}%` } }],
          }
        : null,
      order: [["createdAt", "DESC"]],
      offset: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10,
    });
    res.status(200).json({
      statusCode: 200,
      message: "List of comments",
      data: comments.rows,
      total: comments.count,
    });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (comment) {
      res
        .status(200)
        .json({ statusCode: 200, message: "Comment found", data: comment });
    } else {
      res.status(404).json({ statusCode: 404, error: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Comment.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedComment = await Comment.findByPk(id);
      res.status(200).json({
        statusCode: 200,
        message: "Comment updated successfully",
        data: updatedComment,
      });
    } else {
      res.status(404).json({ statusCode: 400, error: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.destroy({
      where: { id: id },
    });
    if (deleted) {
      res
        .status(200)
        .json({ statusCode: 200, message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ statusCode: 404, error: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};
