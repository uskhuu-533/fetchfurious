import express from "express";
import { getBank } from "../controller/bank/get-bank";
import { postBank } from "../controller/bank/post-bank";
import { authenticationJWT } from "../middleware/User/jwt";
import { putBank } from "../controller/bank/put-bank";

export const BankRouter = express.Router();

BankRouter.get('/',authenticationJWT, getBank)
BankRouter.post('/',authenticationJWT, postBank)
BankRouter.put('/', authenticationJWT, putBank)