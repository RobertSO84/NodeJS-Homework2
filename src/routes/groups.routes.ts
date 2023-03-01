import express from "express";
import { GroupService } from "../services/group.service";
import { validateGroupData } from "../utils/validations";
import { logger } from "../utils/logger";
import { checkToken } from "../middleware/authMiddleware";

const groupService = new GroupService();

const router = express.Router();

router.get("/", checkToken, async (_req, res) => {
  try {
    const groups = await groupService.findAll();
    res.send(groups);
  } catch (error: any) {
    logger.error(error.message);
  }
});

router.get("/:id", checkToken, async (req, res) => {
  try {
    const group = await groupService.findById(req.params.id);
    if (!group) {
      throw new Error("Group not found");
    }
    res.send(group);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", checkToken, async (req, res) => {
  try {
    const { error, value } = validateGroupData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const newGroup = await groupService.createGroup(value);
    res.json(newGroup);
  } catch (error: any) {
    logger.error(error.messsage);
    res.status(400).send(error.message);
  }
});

router.patch("/:id", checkToken, async (req, res) => {
  try {
    const { error, value } = validateGroupData(req.body);
    if (error) {
      throw new Error(error.message);
    }
    const { name, permissions } = value;
    const updatedGroup = await groupService.updateGroup(String(req.params.id), {
      name,
      permissions,
    });
    res.json(updatedGroup);
  } catch (error: any) {
    logger.error(error.messsage);
    res.status(400).send(error.message);
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  try {
    const groupDeleted = await groupService.deleteGroup(req.params.id);
    if (!groupDeleted) {
      throw new Error();
    }
    res.json(groupDeleted);
  } catch (error: any) {
    logger.error(error.messsage);
    res.sendStatus(404);
  }
});

export default router;
