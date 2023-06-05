import Notification from "../models/Notification.js";
import mongoose from "mongoose";

// Get all notifications for a user

export const getNotifications = async (req, res) => {
  const uid = req.userId;
  try {
    console.log(uid)
    const notifications = await Notification.find({ recipientId: mongoose.Types.ObjectId(uid) }).sort({
      createdAt: -1,
    });
    // here populating the notifications whose type is adAddedToWishlist with those products titles

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Mark the notification as read

export const markRead = async (req, res) => {
  const uid = req.userId;

  try {
    await Notification.updateMany({ recipientId: uid }, { isRead: true });
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Send a notification to a user

export const sendNotification = async (req, res) => {
  const { recipientId, message } = req.body;
console.log(req.body)
  console.log(recipientId, message)

  await Notification.create({
    recipientId: mongoose.Types.ObjectId(recipientId),
    message,
  });
  res.status(200).json({ message: "Notification sent" });
};
