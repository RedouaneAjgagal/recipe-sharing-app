import { Router } from "express";
import { rateRecipe } from "../controllers/rateController";
import authenticateUser from "../middlewares/authentication";


const router = Router();

router.post("/", authenticateUser, rateRecipe);
// router.put("/:rateId", authenticateUser, updateRate);


export default router;