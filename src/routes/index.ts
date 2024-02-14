import express from 'express';
import authRouter from './authRoutes'
import userRouter from './userRoutes'
import auth from '../utils/middleware/auth';


/**
 * @export
 * @param {express.Application} app
 */


export function init(app: express.Application): void {
    const router: express.Router = express.Router();

     app.use('/api/auth',authRouter)
     app.use('/v1/profile',auth, userRouter)

     app.use(router);
}