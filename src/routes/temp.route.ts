import { Router, NextFunction, Request, Response } from "express";
import multer from "multer";
import {
  createTemplate,
  uploadTemplateFile,
} from "../controllers/temp.controler";

import { ForbiddenError } from "../middlewares";

const router = Router();

import { validationMiddleware } from "../middlewares/validationMiddleware";
import { templateSchema } from "../middlewares/validations/temp.zod";

const storage = multer.memoryStorage();
const uploads = multer({ storage: storage }).single("file");

const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  uploads(req, res, function (err) {
    if (err) {
      const newForbbidenError = new ForbiddenError("You must upload one image");
      next(newForbbidenError);
    }
    next();
  });
};

// create template
router.post(
  "/template/",
  uploadHandler,
  validationMiddleware(templateSchema),
  createTemplate
);
