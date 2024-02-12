import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/http/statusCode";
import { editProfileSchema } from "../utils/validation/validation";
import userServices from "../services/userServices";

export const getProfile = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req", req.user);
    const { userId } = req.user;
    const user = await userServices.getProfile(userId);
    return res
      .status(statusCodes.SUCCESS)
      .json({
        message: "profile fetch successfully",
        success: true,
        code: 200,
        data:user
      });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber } = req.body;
    const { error } = editProfileSchema.validate({
      id,
      name,
      phoneNumber,
    });

    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message, success: false, code: 400 });
    }

    const response = await userServices.editProfile(id, name, phoneNumber);
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Profile edited successfully",
      success: true,
      code: 200,
      data: response,
    });
  } catch (error: any) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: error.message, success: false, code: 400 });
  }
};
