import express from "express";
import { authenticationJWT } from "../middleware/User/jwt";
import { putPassword } from "../controller/user/user";
import { generateQrCode } from "../controller/donation/generateQr";

export const qrRouter  = express.Router();

qrRouter.post('/:userId', generateQrCode)