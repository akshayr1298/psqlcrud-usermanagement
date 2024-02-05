import { Router } from "express";
import { logOut, signIn, signUp } from "../controller/authController";



/**
 * @constant {express.Router}
 */
const router: Router = Router();



router.post('/signup',signUp);
router.post('/signin',signIn)
router.post('/logout',logOut)
/**
 * @export {express.Router}
 */
export default router;