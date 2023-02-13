import { UpdatedUserEntry } from "../types";
import { User } from "../models/user.model";
import { DB } from "../database/database";
import { UserGroup } from "../models/userGroup.model";
import { Transaction } from "sequelize";
import { Group } from "../models/group.model";

export class UserService {
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  async createUser(user: User): Promise<User> {
    return await User.create(user);
  }

  async deleteUser(id: string): Promise<string | undefined> {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
      return "User deleted";
    }
    return undefined;
  }

  async updateUser(
    id: string,
    updatedUserEntry: UpdatedUserEntry
  ): Promise<User> {
    const { login, password, age } = updatedUserEntry;
    const user = await User.findByPk(id);
    if (user) {
      user.login = login;
      user.password = password;
      user.age = age;
      await user.save();
      return user;
    }
    throw new Error("Id not found");
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number | undefined) {
    const users = await User.findAll();

    const filteredUsers = users.filter((user) =>
      user.login.toLowerCase().includes(loginSubstring.toLowerCase())
    );

    const sortedUsers = filteredUsers.sort((a, b) =>
      a.login > b.login ? 1 : -1
    );

    const suggestedUsers = sortedUsers.slice(0, limit);

    return suggestedUsers;
  }

  async addUserToGroup(
    userId: string | undefined,
    groupId: string | undefined
  ): Promise<UserGroup | undefined> {
    const t: Transaction = await DB.sequelize.transaction();
    try {
      const user = await User.findByPk(userId);
      const group = await Group.findByPk(groupId);

      if (!user || !group) {
        throw new Error(
          "Unable to match User and Group, verify userId and groupId exist"
        );
      }
      const userToGroup = await UserGroup.create(
        { userId, groupId },
        { transaction: t }
      );
      await t.commit();
      return userToGroup;
    } catch (error: any) {
      console.error(error.message);
      if (t) {
        await t.rollback();
      }
      throw new Error("Unable to match user and group");
    }
  }
}
