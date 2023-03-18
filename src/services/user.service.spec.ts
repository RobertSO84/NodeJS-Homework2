import { User } from "../models/user.model";
import { UserService } from "./user.service";

jest.mock("./user.service");
jest.mock("../models/user.model");

describe("User Service", () => {
  let service: UserService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = new UserService();
  });

  describe("findAll()", () => {
    it("returns users", async () => {
      let findAllSpy = jest.spyOn(service, "findAll");
      const user1 = {
        id: "f03886b3-ea4f-4e9b-97f9-93077034b96e",
        login: "Rob45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      };
      const user2 = {
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      };
      const users = [new User(user1), new User(user2)];

      findAllSpy.mockResolvedValue(users);

      await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe("finById()", () => {
    it("returns user", async () => {
      const finduserByIdSpy = jest.spyOn(service, "findById");
      const user = {
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      };
      const mockUser = new User(user);
      finduserByIdSpy.mockResolvedValue(mockUser);

      await service.findById(user.id);

      expect(finduserByIdSpy).toHaveBeenCalledWith(
        "f400c15d-d6c3-4530-a813-149a49ffebc3"
      );
    });
  });

  describe("createUser()", () => {
    it("creates user", async () => {
      const createUserSpy = jest.spyOn(service, "createUser");
      const user = {
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      };
      const mockUser = new User(user);
      createUserSpy.mockResolvedValue(mockUser);

      await service.createUser(mockUser);
      expect(createUserSpy).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("deleteUser()", () => {
    it("returns User deleted message", async () => {
      const deleteUserSpy = jest.spyOn(service, "deleteUser");
      const user = new User({
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      });
      deleteUserSpy.mockResolvedValue("User deleted");

      const result = await service.deleteUser(user.id);
      expect(result).toEqual("User deleted");
      expect(deleteUserSpy).toHaveBeenCalledWith(user.id);
    });

    it("returns undefined when not found", async () => {
      const deleteUserSpy = jest.spyOn(service, "deleteUser");

      deleteUserSpy.mockResolvedValue(undefined);

      const result = await service.deleteUser("123");
      expect(result).toEqual(undefined);
      expect(deleteUserSpy).toHaveBeenCalledWith("123");
    });
  });

  describe("updateUser()", () => {
    it("updates user", async () => {
      const updateUserSpy = jest.spyOn(service, "updateUser");
      const id = "f400c15d-d6c3-4530-a813-149a49ffebc3";
      const updatedUser = {
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
      };
      const user = new User({
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        login: "Ana45@hotmail.com",
        password: "3e4e",
        age: 22,
        isDeleted: false,
      });
      updateUserSpy.mockResolvedValue(user);

      const result = await service.updateUser(id, updatedUser);

      expect(updateUserSpy).toHaveBeenCalledWith(id, updatedUser);
      expect(result).toEqual(user);
    });
  });
});
