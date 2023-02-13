import express from "express";
import { UserService } from "../services/user.service";
import {
  validateUpdatedUserData,
  validateUserData,
  validateUserToGroupData,
} from "../utils/validations";

const userService = new UserService();

const router = express.Router();

router.get("/", async (_req, res) => {
  const users = await userService.findAll();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await userService.findById(req.params.id);

  return user ? res.send(user) : res.sendStatus(404);
});

router.get("/suggestions/:loginSubstring", async (req, res) => {
  try {
    const loginSubstring = req.params.loginSubstring;

    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const filteredUsers = await userService.getAutoSuggestUsers(
      loginSubstring,
      limit
    );

    res.json(filteredUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = validateUserData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const newUser = await userService.createUser(value);
    res.json(newUser);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.post("/addUserToGroup/", async (req, res) => {
  try {
    const { error, value } = validateUserToGroupData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const { userId, groupId } = value;
    const newUserGroup = await userService.addUserToGroup(userId, groupId);
    res.json(newUserGroup);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { error, value } = validateUpdatedUserData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const { login, password, age } = value;
    const updatedUser = await userService.updateUser(String(req.params.id), {
      login,
      password,
      age,
    });
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const userDeleted = await userService.deleteUser(req.params.id);
  console.log(userDeleted);
  return userDeleted ? res.json(userDeleted) : res.sendStatus(404);
});

export default router;
