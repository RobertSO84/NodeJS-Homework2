export type Gender = "male" | "female" | "other";

export interface UserEntry {
  id: number;
  login: string;
  password: string;
  age: number;
  gender: Gender;
  isDeleted: boolean;
}

export type NewUserEntry = Omit<UserEntry, "id" | "isDeleted">;
