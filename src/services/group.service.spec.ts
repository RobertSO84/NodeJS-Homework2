import { Group } from "../models/group.model";
import { GroupService } from "./group.service";
import { UpdatedGroupEntry } from "../types";

jest.mock("../models/group.model");
jest.mock("./group.service");

describe("Group Service", () => {
  let service: GroupService;

  beforeEach(() => {
    jest.resetAllMocks();
    service = new GroupService();
  });

  describe("findAll()", () => {
    it("returns groups", async () => {
      const findAllGroupSpy = jest.spyOn(service, "findAll");
      const group1 = {
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        name: "Javascript Group",
        permissions: ["WRITE", "READ"],
      };

      const groups = [new Group(group1)];

      findAllGroupSpy.mockResolvedValue(groups);

      await service.findAll();

      expect(findAllGroupSpy).toHaveBeenCalled();
    });
  });

  describe("findById()", () => {
    it("returns group", async () => {
      const finduserByIdSpy = jest.spyOn(service, "findById");
      const group = {
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        name: "Javascript Group",
        permissions: ["WRITE", "READ"],
      };
      const mockedGroup = new Group(group);
      finduserByIdSpy.mockResolvedValue(mockedGroup);

      await service.findById(group.id);

      expect(finduserByIdSpy).toHaveBeenCalledWith(
        "f400c15d-d6c3-4530-a813-149a49ffebc3"
      );
    });
  });

  describe("createGroup()", () => {
    it("creates group", async () => {
      const createGroupSpy = jest.spyOn(service, "createGroup");
      const group = new Group({
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        name: "Javascript Group",
        permissions: ["WRITE", "READ"],
      });
      createGroupSpy.mockResolvedValue(group);

      await service.createGroup(group);
      expect(createGroupSpy).toHaveBeenCalledWith(group);
    });
  });

  describe("deleteGroup()", () => {
    it("returns Group deleted message", async () => {
      const deleteGroupSpy = jest.spyOn(service, "deleteGroup");
      const group = new Group({
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        name: "Javascript Group",
        permissions: ["WRITE", "READ"],
      });
      deleteGroupSpy.mockResolvedValue("Group deleted");

      const result = await service.deleteGroup(group.id);
      expect(result).toEqual("Group deleted");
      expect(deleteGroupSpy).toHaveBeenCalledWith(group.id);
    });

    it("returns undefined when not found", async () => {
      const deleteUserSpy = jest.spyOn(service, "deleteGroup");

      deleteUserSpy.mockResolvedValue(undefined);

      const result = await service.deleteGroup("123");
      expect(result).toEqual(undefined);
      expect(deleteUserSpy).toHaveBeenCalledWith("123");
    });
  });

  describe("updateGroup()", () => {
    it("updates group", async () => {
      const updateGroupSpy = jest.spyOn(service, "updateGroup");
      const id = "f400c15d-d6c3-4530-a813-149a49ffebc3";
      const updatedGroup: UpdatedGroupEntry = {
        name: "Golang Group",
        permissions: ["WRITE", "READ"],
      };
      const group = new Group({
        id: "f400c15d-d6c3-4530-a813-149a49ffebc3",
        name: "Golang Group",
        permissions: ["WRITE", "READ"],
      });
      updateGroupSpy.mockResolvedValue(group);

      const result = await service.updateGroup(id, updatedGroup);

      expect(updateGroupSpy).toHaveBeenCalledWith(id, updatedGroup);
      expect(result).toEqual(group);
    });
  });
});
