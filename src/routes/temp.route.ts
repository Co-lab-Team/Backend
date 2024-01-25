import { Router, NextFunction, Request, Response } from "express";
import multer from "multer";
import { createTemplate } from "../controllers/temp.controler";

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

/**
 * @swagger
 * tags:
 *   name: Template
 *   description: Template operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TemplateResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             fileSize:
 *               type: number
 *             templateURL:
 *               type: string
 *             category:
 *               type: string
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *             slug:
 *               type: string
 *             creatorID:
 *               type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         error:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             message:
 *               type: string
 *             stack:
 *               type: string
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @swagger
 * /template/:
 *   post:
 *     summary: Create a new template
 *     description: Create a new template by uploading a file and providing template information.
 *     tags: [Template]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               template:
 *                 type: string
 *               compactible:
 *                 type: array
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemplateResponse'
 *       400:
 *         description: Bad Request. The request is missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden. You must upload one image.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error. An error occurred while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/template/",
  uploadHandler,
  validationMiddleware(templateSchema),
  createTemplate
);

module.exports = router;
