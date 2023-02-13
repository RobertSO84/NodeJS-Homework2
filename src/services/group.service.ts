import { GroupEntry, UpdatedGroupEntry } from "../types";
import { Group } from "../models/group.model";

export class GroupService {
  async findAll(): Promise<Group[]> {
    return await Group.findAll();
  }

  async findById(id: string): Promise<Group | null> {
    return await Group.findByPk(id);
  }

  async createGroup(group: GroupEntry): Promise<Group> {
    return await Group.create(group);
  }

  async deleteGroup(id: string): Promise<string | undefined> {
    const group = await this.findById(id);
    if (group) {
      await group.destroy();
      return "Group deleted";
    }
    return undefined;
  }

  async updateGroup(
    id: string,
    updatedGroupEntry: UpdatedGroupEntry
  ): Promise<Group> {
    const { name, permissions } = updatedGroupEntry;
    const group = await this.findById(id);
    if (group) {
      group.name = name;
      group.permissions = permissions;
      await group.save();
      return group;
    }
    throw new Error("Id not found");
  }
}
