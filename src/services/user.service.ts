import { Transaction } from "sequelize";
import jwt from "jsonwebtoken";
import { UpdatedUserEntry } from "../types";
import { User } from "../models/user.model";
import { DB } from "../database/database";
import { UserGroup } from "../models/userGroup.model";
import { Group } from "../models/group.model";
import { JWT_SECRET } from "../../config";

export class UserService {
  findAll(): Promise<User[]> {
    return User.findAll();
  }

  findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  createUser(user: User): Promise<User> {
    return User.create(user);
  }

  async deleteUser(id: string): Promise<string | undefined> {
    const user = await this.findById(id);
    if (user) {
      user.destroy();
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
      user.save();
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

      if (!user && !group) {
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

  async login(login: string, password: string): Promise<string | null> {
    const user = await User.findOne({ where: { login: login } });
    if (!user || user.password !== password) {
      throw new Error("User not found for login");
    }
    const payload = { sub: user.id, login: user.login };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: 600,
    });
    return token;
  }
}
