import jwt from "jsonwebtoken";
import { JWT_HTTP_HEADER_KEY, JWT_SECRET } from "../../config";

export function checkToken(
  req: { headers: { [x: string]: any } },
  res: any,
  next: () => void
) {
  const token = req.headers[JWT_HTTP_HEADER_KEY];
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  return jwt.verify(
    token,
    JWT_SECRET,
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
