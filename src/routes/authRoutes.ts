import { Router } from "express";
import { logOut, signIn, signUp } from "../controller/authController";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* POST request */

router.post("/signup", signUp); // registeration api
router.post("/signin", signIn); // login api
router.post("/logout", logOut); // logout api

/**
 * @export {express.Router}
 */
export default router;
