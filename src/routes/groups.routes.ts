import express from "express";
import { GroupService } from "../services/group.service";
import { validateGroupData } from "../utils/validations";

const groupService = new GroupService();

const router = express.Router();

router.get("/", async (_req, res) => {
  const groups = await groupService.findAll();
  res.send(groups);
});

router.get("/:id", async (req, res) => {
  const group = await groupService.findById(req.params.id);

  return res.send(group) || res.sendStatus(404);
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = validateGroupData(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const newGroup = await groupService.createGroup(value);
    res.json(newGroup);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
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
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const groupDeleted = await groupService.deleteGroup(req.params.id);
  return groupDeleted ? res.json(groupDeleted) : res.sendStatus(404);
});

export default router;
