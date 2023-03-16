import { User } from "./models/user.model";

export interface UserEntry {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export type UpdatedUserEntry = Omit<UserEntry, "id" | "isDeleted">;

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export interface GroupEntry {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

export type UpdatedGroupEntry = Omit<GroupEntry, "id">;

export interface UserRepository {
  findAll(): Promise<UserEntry[]>;
  findById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<String | null>;
  updateUser(id: string, user: UpdatedUserEntry): Promise<User>;
  getAutoSuggestUsers(
    loginSubstring: string,
    limit: number | undefined
  ): Promise<User[]>;
  addUserToGroup(
    userId: string | undefined,
    groupId: string | undefined
  ): Promise<UserGroup | undefined>;
  login(login: string, password: string): Promise<string | null>;
}

export class UserFakeRepository implements UserRepository {
  findAll(): Promise<UserEntry[]> {
    return Promise.resolve([]);
  }
  findById(id: string): Promise<User | null> {
    return Promise.resolve({} as User);
  }
  createUser(user: User): Promise<User> {
    return Promise.resolve({} as User);
  }
  deleteUser(id: string): Promise<String | null> {
    return Promise.resolve();
  }
  updateUser(id: string, user: UpdatedUserEntry): Promise<User> {
    return Promise.resolve({} as User);
  }
  getAutoSuggestUsers(
    loginSubstring: string,
    limit: number | undefined
  ): Promise<User[]> {
    return Promise.resolve({} as User);
  }
  addUserToGroup(
    userId: string | undefined,
    groupId: string | undefined
  ): Promise<UserGroup | undefined>;
  login(login: string, password: string): Promise<string | null> {
    return Promise.resolve();
  }
}
