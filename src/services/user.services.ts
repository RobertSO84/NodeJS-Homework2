import { NewUserEntry, UserEntry } from "../types";
import usersData from "./users.json";

const users: Array<UserEntry> = usersData as Array<UserEntry>;

export const getUsers = (): Array<UserEntry> => users;

export const findById = (id: number): UserEntry | undefined => {
  const entry = users.find((data) => data.id === id);
  return entry;
};

export const addUser = (newUserEntry: NewUserEntry) => {
  const newUser = {
    id: users.length + 1,
    ...newUserEntry,
    isDeleted: false,
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = (id: number, newUserEntry: NewUserEntry) => {
  const { login, password, age, gender } = newUserEntry;
  const entry = users.find((data) => data.id === id);
  if (entry) {
    entry.login = login;
    entry.password = password;
    entry.age = age;
    entry.gender = gender;
    return entry;
  }
  throw new Error("Id not found");
};

export const deleteUser = (id: number): UserEntry | undefined => {
  const entry = users.find((data) => data.id === id);
  if (entry) {
    entry.isDeleted = true;
    return entry;
  }
  return undefined;
};

export const getAutoSuggestUsers = (
  loginSubstring: string,
  limit: number | undefined
) => {
  const users = getUsers();

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(loginSubstring.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) =>
    a.login > b.login ? 1 : -1
  );
  return sortedUsers.slice(0, limit);
};
