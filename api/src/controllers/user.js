import { Op } from "sequelize";
import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ statusCode: 201, message: "User created successfully", data: user });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const { skip, limit, search } = req.query;
  try {
    const users = await User.findAndCountAll({
      where: search
        ? {
          [Op.or]: [
            { username: { [Op.iLike]: `%${search}%` } },
            { firstName: { [Op.iLike]: `%${search}%` } },
            { lastName: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        }
        : null,
      where: { status: true },
      offset: skip ? parseInt(skip) : 0,
      limit: limit ? parseInt(limit) : 10,
    });
    res
      .status(200)
      .json({ statusCode: 200, message: "List of users", data: users.rows, total: users.count });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      res.status(200).json({ statusCode: 200, message: "User found", data: user });
    } else {
      res.status(404).json({ statusCode: 404, error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json({ statusCode: 200, message: "User found", data: user });
    } else {
      res.status(404).json({ statusCode: 404, error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(202).json({ statusCode: 202, message: "User updated successfully", data: updatedUser });
    } else {
      res.status(404).json({ statusCode: 404, error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(200).send({ statusCode: 200, message: "User deleted successfully" });
    } else {
      res.status(404).json({ statusCode: 404, error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: error.message });
  }
};
