import express from "express";
import { UserService } from "../services/user.service";
import {
  validateUpdatedUserData,
  validateUserData,
  validateUserLoginData,
  validateUserToGroupData,
} from "../utils/validations";
import { logger } from "../utils/logger";
import { checkToken } from "../middleware/authMiddleware";

const userService = new UserService();

const router = express.Router();

router.get("/", checkToken, async (_req, res) => {
  try {
    const users = await userService.findAll();
    res.send(users);
  } catch (error: any) {
    logger.error(error.message);
  }
});

router.get("/:id", checkToken, async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get("/suggestions/:loginSubstring", checkToken, async (req, res) => {
  try {
    const loginSubstring = req.params.loginSubstring;

    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const filteredUsers = await userService.getAutoSuggestUsers(
      loginSubstring,
      limit
    );

    res.json(filteredUsers);
  } catch (error: any) {
    logger.error(error.messsage);
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
    logger.error(error.messsage);
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
    logger.error(error.messsage);
    res.status(400).send(error.message);
  }
});

router.patch("/:id", checkToken, async (req, res) => {
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
    logger.error(error.messsage);
    res.status(400).send(error.message);
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  try {
    const userDeleted = await userService.deleteUser(req.params.id);
    if (!userDeleted) {
      throw new Error();
    }
    res.json(userDeleted);
  } catch (error: any) {
    logger.error(error.messsage);
    res.sendStatus(404);
  }
});

router.post("/login/", async (req, res) => {
  try {
    const { error, value } = validateUserLoginData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const { login, password } = value;
    const token = await userService.login(login, password);
    res.json(token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error(error.messsage);
    res.status(400).send(error.message);
  }
});

export default router;
