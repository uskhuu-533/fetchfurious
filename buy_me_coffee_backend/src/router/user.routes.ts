import express from "express";
import { authenticationJWT } from "../middleware/User/jwt";
import { putPassword } from "../controller/user/user";

export const UserRouter  = express.Router();

UserRouter.put('/', authenticationJWT, putPassword)