// import { mock } from "jest-mock-extended";
// import { UserService } from "./user.service";
// import { User } from "../models/user.model";
// // import { User } from "../models/user.model";

// beforeEach(() => {
//   jest.resetAllMocks();
// });

// describe("UserService", () => {
//   const mockUserService = mock<UserService>();
//   //   const user = {
//   //     login: "Rob45@hotmail.com",
//   //     password: "3e4e",
//   //     age: "34",
//   //   };

//   it("Should find all users", () => {
//     mockUserService.findAll();
//     expect(mockUserService.findAll).toHaveBeenCalledWith();
//   });

//   it("Should find by Id", async () => {
//     const user = {
//       id: "bbb30ce3-165e-4ec0-bf30-3691110425c8",
//       isDeleted: false,
//       login: "Rob45@hotmail.com",
//       password: "3e4e",
//       age: 22,
//       updatedAt: "2023-03-14T00:46:51.163Z",
//       createdAt: "2023-03-14T00:46:51.163Z",
//     };
//     const mockUser = mock<User>();

//     const newUserService = new UserService();
//     const userFetched = await newUserService.findById(user.id);
//     expect(userFetched).toBe(user);
//     // jest.spyOn(UserService, "findByPk").mockReturnValue(user)

//     // // mockUserService.findById = jest.fn().mockReturnValue(user.id);
//     // mockUserService.findById.mockReturnValue(user)
//     // expect(mockUserService.findById(id)).toHaveBeenCalledWith(id)
//     // mockUserService.findById.
//     // awa
//   });
// });
