import express from "express";
import { login, logout, register, shouldAdmin, shouldLogged } from "../controllers/auth.controller";
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.post('/logout' , logout);
router.post('/should-be-logged-in' , shouldLogged);
router.post('/should-be-admin' , shouldAdmins);
export default router;

