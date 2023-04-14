import { Router } from "express";
import { surveysRouter } from "./surveys.routes";
import { usersRoutes } from "./users.routes";
import { surveysUsersRouter } from "./surveys-users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/surveys", surveysRouter);
router.use("/surveys-users", surveysUsersRouter);

export { router };
