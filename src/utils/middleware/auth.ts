import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import statusCodes from "@utils/http/statusCode";

export const verifyToken = (
  req: Request | any,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    console.log("cookies", req.cookies);
    const token = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    console.log("token", token, "refresh", refreshToken);
    if (!token) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: "You are not authenticated" });
    }
    let secret: string | any = process.env.JWT_SECRET;
    // type UserType = {
    //     email: string;
    //   };
    jwt.verify(token, secret, (err: any, user: any) => {
      console.log("user", user);

      if (err) {
        console.log("errname", err.name);
        if (err.name === "TokenExpiredError") {
          // Access token has expired, try to refresh it
          jwt.verify(refreshToken, secret, (err: any, user: any) => {
            if (err) {
              return res
                .status(statusCodes.UNAUTHORIZED)
                .json({ message: "Invalid refresh token" });
            }

            // Generate a new access token
            const newAccessToken = jwt.sign({ email: user.email }, secret, {
              expiresIn: "15m",
            });

            // Set the new access token in the response cookies
            res.cookie("access_token", newAccessToken, {
              maxAge: 600000,
              httpOnly: true,
            });

            // Proceed to the next middleware
            req.user = user;
            next();
          });
        } else {
          return res
            .status(statusCodes.UNAUTHORIZED)
            .json({ message: "Invalid access token" });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
