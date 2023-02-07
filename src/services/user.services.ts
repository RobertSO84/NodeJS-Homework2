import { NewUserEntry } from "../types";
import { User } from "../models/user.model";

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

  async updateUser(id: string, newUserEntry: NewUserEntry): Promise<User> {
    const { login, password, age } = newUserEntry;
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

    console.log(limit);
    return suggestedUsers;
  }
}
