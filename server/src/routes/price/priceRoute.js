import express from "express";
import passport from "passport";
import { getOneData, updatePrice } from "../../controllers/price/priceController.js";
import permission from "../../middlewares/permission.js";
import { userRole } from "../../utils/userEnum.js";

const router = express.Router();

const auth = passport.authenticate("jwt", { session: false });

router.route("/:id")
         .patch(auth, permission(userRole.ADMIN), updatePrice)
         .get(auth, getOneData)

        //  63f5c489f130d24050545c4a
export default router;
