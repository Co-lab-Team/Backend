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

export const createTemplate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, fileSize, template, category, tags } = req.body;
    const { userID } = req.params;

    const slug = slugifyTemplate(title);

    const newTemplate = await prisma.template.create({
      data: {
        title,
        description,
        fileSize,
        template,
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
