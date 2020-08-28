import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordControlles';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordControlle = new ForgotPasswordController();
const resetPasswordControlle = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordControlle.create);
passwordRouter.post('/reset', resetPasswordControlle.create);

export default passwordRouter;
