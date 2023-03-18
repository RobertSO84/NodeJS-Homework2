import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { User } from "./user.model";
import { UserGroup } from "./userGroup.model";

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";
// enum Permission {
//   READ = "READ",
//   WRITE = "WRITE",
//   DELETE = "DELETE",
//   SHARE = "SHARE",
//   UPLOAD_FILES = "UPLOAD_FILES",
// }

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Array<string>;
}

@Table({
  tableName: "groups",
  timestamps: false,
})
export class Group extends Model<GroupAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM),
    allowNull: false,
    values: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
  })
  permissions!: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users!: User[];
}
