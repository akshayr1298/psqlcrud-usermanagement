import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/http/statusCode";
import authService from "../services/authServices";
import { signInSchmea, signupSchema } from "../utils/validation/validation";
import jwt from "jsonwebtoken";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const { error } = signupSchema.validate({
      name,
      email,
      password,
    });
    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message, success: false, code: 400 });
    }
    const user = await authService.signup(name, email, password);

    return res.status(statusCodes.CREATED).json({
      message: "Account registed successfully",
      success: true,
      code: 201,
      data: user,
    });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { error } = signInSchmea.validate({ email, password });
    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message, success: false, code: 400 });
    }
    const response = await authService.signIn(email, password);
    let secret: string | any = process.env.JWT_SECRET;
    const token = jwt.sign({ eamil: response.email }, secret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ eamil: response.email }, secret, {
      expiresIn: "7d",
    });

    res.cookie("access_token", token, { maxAge: 600000, httpOnly: true });
    res.cookie("refresh_token", refreshToken, { httpOnly: true });
    res.status(statusCodes.SUCCESS).json({
      message: "Successfully logged in",
      success: true,
      code: 200,
      data: response,
      access_token: token,
      refresh_token: refreshToken,
    });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("cookie", req.cookies);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    console.log("clear-cookie", req.cookies);
    return res
      .status(statusCodes.SUCCESS)
      .json({ message: "Log out successfully", success: true, code: 200 });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};
