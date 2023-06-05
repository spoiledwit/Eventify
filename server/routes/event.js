import { getEvent, getEvents, updateEvent, createEvent, deleteEvent, addUserToEvent, getUserEvents } from "../controllers/event.js";

import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.route("/")
.get(getEvents)
.post(verifyToken, createEvent);

router.get("/myevents", verifyToken, getUserEvents);

router.route("/:id")
.get(getEvent)
.put(verifyToken, updateEvent)
.delete(verifyToken, deleteEvent);

router.post("/join/:id", verifyToken, addUserToEvent);

export default router;