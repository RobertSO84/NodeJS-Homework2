import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export function checkToken(
  req: { headers: { [x: string]: any } },
  res: any,
  next: () => void
) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  return jwt.verify(
    token,
    authConfig.secret,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function (error: any, _decoded: any) {
      if (error) {
        return res
          .status(403)
          .send({ success: false, message: "Failed to authenticate token." });
      }
      return next();
    }
  );
}
