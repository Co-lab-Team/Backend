import { Router } from "express";

import { createTemplate } from "../controllers/temp.controler";

const router = Router();

import { validationMiddleware } from "../middlewares/validationMiddleware";
