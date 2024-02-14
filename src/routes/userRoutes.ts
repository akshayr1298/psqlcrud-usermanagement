import { Router } from "express";
import {
  addAddress,
  editProfile,
  getProfile,
} from "../controller/userController";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* POST request */
router.post("/add/address", addAddress);

router.get("/profile", getProfile);

router.patch("/edit/:id", editProfile);

/**
 * @export {express.Router}
 */
export default router;
