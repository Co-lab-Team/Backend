import { Request, Response, NextFunction, RequestHandler } from "express";
import bycript from "bcryptjs";
import prisma from "../utils/prisma";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../middlewares";
import { ResponseHandler } from "../utils/responsehandler";
import { slugifyTemplate } from "../services/slugify";
import { emailService } from "../services/mailer";

import { uploadTemplate } from "../services/imageupload";

export const createTemplate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, fileSize, template, category, tags } = req.body;
    const { userID } = req.params;

    const file = req.file as any;
    const { service } = req.body;

    if (!file) {
      throw new BadRequestError("Please Upload a Template");
    }

    // verify the user id
    const validUser = await prisma.user.findUnique({
      where: { userID: userID },
      select: {
        userID: true,
      },
    });

    if (!validUser) {
      throw new NotFoundError("User not found");
    }

    // todo: if file size is beyond 100M

    const { url, size } = await uploadTemplate(file, service);

    const slug = slugifyTemplate(title);

    const newTemplate = await prisma.template.create({
      data: {
        title,
        description,
        fileSize: size,
        templateURL: url,
        category,
        tags,
        slug,
        creatorID: userID,
      },
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: newTemplate,
    });
  } catch (error) {
    next(error);
  }
};
