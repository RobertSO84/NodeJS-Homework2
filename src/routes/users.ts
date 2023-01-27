import express from "express";
import {
  getUsers,
  findById,
  addUser,
  deleteUser,
  updateUser,
  getAutoSuggestUsers,
} from "../services/user.services";
import { validateNewUserData, validateUserData } from "../utils/validations";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getUsers());
});

router.get("/:id", (req, res) => {
  const user = findById(Number(req.params.id));

  return user ? res.send(user) : res.sendStatus(404);
});

router.get("/suggestions/:loginSubstring", (req, res) => {
  try {
    const loginSubstring = req.params.loginSubstring;
    const limit = Number(req.query.limit);
    const filteredUsers = getAutoSuggestUsers(loginSubstring, limit);
    res.json(filteredUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    const { error, value } = validateUserData(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const { login, password, age, gender } = value;
    const newUser = addUser({ login, password, age, gender });
    res.json(newUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", (req, res) => {
  try {
    const { error, value } = validateNewUserData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    console.log(value);
    const { login, password, age, gender } = value;
    const updatedUser = updateUser(Number(req.params.id), {
      login,
      password,
      age,
      gender,
    });
    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", (req, res) => {
  const userDeleted = deleteUser(Number(req.params.id));
  return userDeleted ? res.send(userDeleted) : res.sendStatus(404);
});

export default router;
