import express from 'express';
import authRouter from './userRoutes'


/**
 * @export
 * @param {express.Application} app
 */


export function init(app: express.Application): void {
    const router: express.Router = express.Router();

     app.use('/api/auth',authRouter)


     app.use(router);
}