import { Router } from "express";
import { surveysRouter } from "./surveys.routes";
import { usersRoutes } from "./users.routes";

const router = Router()

router.use("/users", usersRoutes)
router.use("/surveys", surveysRouter)

export { router };
