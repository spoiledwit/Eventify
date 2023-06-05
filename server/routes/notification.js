import express from "express";
import {
  markRead,
  getNotifications,
  sendNotification,
} from "../controllers/notification.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.patch("/", markRead);
router.post("/", sendNotification);
router.get("/", verifyToken, getNotifications);
export default router