import { Table, Column, ForeignKey, Model } from "sequelize-typescript";
import { User } from "./user.model";
import { Group } from "./group.model";

@Table
export class UserGroup extends Model {
  @ForeignKey(() => User)
  @Column({
    onDelete: "CASCADE",
  })
  userId!: number;

  @ForeignKey(() => Group)
  @Column({
    onDelete: "CASCADE",
  })
  groupId!: number;
}
