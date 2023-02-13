import Joi from "joi";
import { GroupEntry, UpdatedUserEntry, UserEntry } from "../types";

export const validateUserData = (user: UserEntry) => {
  const userSchema = Joi.object({
    id: Joi.number(),
    login: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .required()
      .error(
        new Error("Password must contain at least one letter and one number")
      ),
    age: Joi.number().min(4).max(130).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    isDeleted: Joi.boolean(),
  });

  return userSchema.validate(user);
};

export const validateUpdatedUserData = (user: UpdatedUserEntry) => {
  const userSchema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    age: Joi.number().integer().min(4).max(130).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
  });

  return userSchema.validate(user);
};

export const validateGroupData = (group: GroupEntry) => {
  const groupSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    permissions: Joi.array()
      .items(
        Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
      )
      .required(),
  });

  return groupSchema.validate(group);
};
