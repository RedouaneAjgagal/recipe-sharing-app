import { Router } from "express";
import { rateRecipe, updateRate } from "../controllers/rateController";
import authenticateUser from "../middlewares/authentication";


const router = Router();

router.post("/", authenticateUser, rateRecipe);
router.put("/:rateId", authenticateUser, rateRecipe);


export default router;