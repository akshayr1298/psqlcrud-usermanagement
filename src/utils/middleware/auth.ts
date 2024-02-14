import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../http/statusCode";

const auth = (
  req: Request | any,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log('your session ',req.session);
    if(!req.session.userId){
      return res.status(statusCodes.UNAUTHORIZED).json({message: 'Your session is expired'});
    }
    console.log("token", token, "refresh", refreshToken);
    if (!token) {
      return res
        .status(statusCodes.UNAUTHORIZED)
        .json({ message: "You are not authenticated" });
    }
    let secret: string | any = process.env.JWT_SECRET;
   
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
            res.cookie("accessToken", newAccessToken, {
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

export default auth;
