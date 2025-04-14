import express from "express";
import { postProfile } from "../controller/profile/post-profile";
import { authenticationJWT } from "../middleware/User/jwt";
import { getProfile } from "../controller/profile/get-profile";
import { getManyProfiles } from "../controller/profile/getManyProfile";
import { addBackground } from "../controller/profile/addBackground";
import { putProfile } from "../controller/profile/updated";
import { getUserProfile } from "../controller/profile/getUserProfile";
import { putMessage } from "../controller/profile/successMessgae";

export const ProfileRouter = express.Router();

ProfileRouter.post("/", authenticationJWT, postProfile);
ProfileRouter.get("/user/:userId", getProfile);
ProfileRouter.get("/explore", authenticationJWT, getManyProfiles);
ProfileRouter.put('/backgorund/:userId', addBackground)
ProfileRouter.put('/', authenticationJWT, putProfile)
ProfileRouter.get('/auth', authenticationJWT, getUserProfile)
ProfileRouter.put("/success", authenticationJWT, putMessage)
