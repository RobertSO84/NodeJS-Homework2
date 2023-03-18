import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  // BeforeCreate,
} from "sequelize-typescript";
// import bcrypt from "bcrypt";
import { UUIDV4 } from "sequelize";
import { Group } from "./group.model";
import { UserGroup } from "./userGroup.model";

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model<UserAttributes> {
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
  login!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isDeleted!: boolean;

  // @BeforeCreate
  // static async hashPassword(instance: User, next: any) {
  //   const hash = await bcrypt.hash(instance.password, 10)
  //   instance.password = hash
  //   next();
  // }

  @BelongsToMany(() => Group, () => UserGroup)
  groups!: Group[];
}
