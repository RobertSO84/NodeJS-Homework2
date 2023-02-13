import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Group } from "../models/group.model";
import { UserGroup } from "../models/userGroup.model";

export class DB {
  public static sequelize: Sequelize;
  public static async initDB() {
    DB.sequelize = new Sequelize(
      "postgres://hxlolgti:vzLLUrq313M3wNIeDrlyX0mt5bc_HqHq@chunee.db.elephantsql.com/hxlolgti"
    );
    DB.sequelize.addModels([User, Group, UserGroup]);

    try {
      await DB.sequelize.authenticate();
      await DB.sequelize.sync({ force: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
