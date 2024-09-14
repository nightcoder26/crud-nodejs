const { User } = require("../models/UserModel");

//CRUD Operations, CREATE, READ, UPDATE AND DELETE
const createUser = async (req, res) => {
  try {
    const { username, name } = req.body;
    const newUser = new User({ username, name });
    await newUser.save();
    res.status(201).json({ message: "USER CREATED", user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "ALREADY EXISTS" });
    } else {
      res.status(500).json({ error });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { name },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    res.status(200).json({ message: "UPDATED DETAILS", user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    res.status(200).json({ message: "DELETED USER" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
};
