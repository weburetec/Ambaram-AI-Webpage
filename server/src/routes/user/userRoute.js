import express from "express";
import passport from "passport";
import { deleteMny, signin, signup, userSignout } from "../../controllers/user/userController.js";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/del", deleteMny)
router.post("/signout", auth, userSignout);

export default router;
