export interface UserEntry {
  id: number;
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
