import { Router } from "express";
import { signup } from "../controller/userController";



/**
 * @constant {express.Router}
 */
const router: Router = Router();



router.post('/signup',signup)

/**
 * @export {express.Router}
 */
export default router;