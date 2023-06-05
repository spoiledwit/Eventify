
import { register, login, getUser, addToWishlist, removeFromWishlist, getWishlist } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/add/:id", verifyToken, addToWishlist);
router.post("/remove/:id", verifyToken, removeFromWishlist);
router.get("/wishlist", verifyToken, getWishlist);

export default router;