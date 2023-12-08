import express from 'express';
import { formlogin, formRegister, formPasswordRecovery, insertUser,message,confirmAccount, resetPassword, changePassword, updatePassword, authenticateUser, homePage} from '../controllers/userControllers.js';

const router = express.Router();
router.get("/", formlogin)
router.get("/register", formRegister)
router.get("/recovery", formPasswordRecovery)
router.post("/register", insertUser)
router.get("/message", message)
//Reset password
router.post("/recovery", resetPassword)
//Confirm account
router.get("/confirm/:token",confirmAccount)
//Change Password
router.get("/change-password/:tokenPassword", changePassword);
router.post("/update-password/:tokenPassword", updatePassword);
router.post("/", authenticateUser);
router.get("/home", homePage);
export default router