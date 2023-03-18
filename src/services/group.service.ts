import { GroupEntry, UpdatedGroupEntry } from "../types";
import { Group } from "../models/group.model";

export class GroupService {
  findAll(): Promise<Group[]> {
    return Group.findAll();
  }

  findById(id: string): Promise<Group | null> {
    return Group.findByPk(id);
  }

  createGroup(group: GroupEntry): Promise<Group> {
    return Group.create(group);
  }

  async deleteGroup(id: string): Promise<string | undefined> {
    const group = await this.findById(id);
    if (group) {
      group.destroy();
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
      group.save();
      return group;
    }
    throw new Error("Id not found");
  }
}
