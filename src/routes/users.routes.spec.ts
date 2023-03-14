import request from "supertest";
import { app } from "..";
// import usersRouter from "./routes/users.routes";
import { UserService } from "../services/user.service";

jest.mock("../services/user.service");

beforeEach(() => {
  jest.resetAllMocks();
  (UserService as jest.Mock<UserService>).mockClear();
});

describe("supertest example", () => {
  const user = {
    login: "Rob45@hotmail.com",
    password: "3e4e",
    age: "34",
  };
  it("response with JSON and store user", async () => {
    const result = await request(app)
      .post("/api/users")
      .send(user)
      .set("Accept", "application/json")
      .expect(200);

    expect(result.text).toEqual("Rob45@hotmail.com");
  });
});
