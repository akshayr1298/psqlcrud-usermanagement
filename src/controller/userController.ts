import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/http/statusCode";
// import userService from "../services/userServices";
import userService from "../services/userServices";
import { signupSchema } from "../utils/validation/validation";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */

export const signup = async(req: Request, res: Response, next: NextFunction) => {
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
    const user = await userService.signup(name, email, password);
    
    return res
      .status(statusCodes.CREATED)
      .json({
        message: "Account registed successfully",
        success: true,
        code: 201,
        data:user
      });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};
