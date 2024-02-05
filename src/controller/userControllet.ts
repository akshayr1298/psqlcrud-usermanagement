import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/http/statusCode";
import authService from "../services/authServices";

export const editProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    

  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};
