import EventModel from "../models/Event.js";
import NotificationModel from "../models/Notification.js";
import { catchError } from "../utils/catchError.js";
import mongoose from "mongoose";
import UserModel from "../models/User.js";

const createEvent = catchError(async (req, res) => {
  try {
    const id = req.userId;
    const {
      title,
      description,
      date,
      status,
      location,
      recurring,
      images,
      max_participants,
      current_participants,
      category,
      tags,
      participants,
    } = req.body;
    const event = await EventModel.create({
      title,
      description,
      date,
      status,
      location,
      creatorId: mongoose.Types.ObjectId(id),
      recurring,
      images,
      max_participants,
      participants,
      category,
      tags,
    });

    const index = Math.floor(Math.random() * tags.length);
    console.log(tags[index]);
    const users = await UserModel.find({ tags: { $in: [tags[index]] } });
    console.log('users: ', users);

    for (const user of users) {
      console.log(user);
      const recipientId = user._id;
      const message = `<p>A new event has been created that matches your interests. Check it out here: <a href="/item/${event._id}">/item/${event._id}</a></p>`;

      await NotificationModel.create({
        message,
        recipientId,
        eventId: event._id,
      });
    }

    res.json(event);
  } catch (error) {
    res.json(error);
  }
});

// Read
const getEvents = catchError(async (req, res) => {
  const searchQuery = req.query.q;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  let query = {};
  let events = null;

  if (searchQuery) {
    query = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } }, 
      ],
    };
  }

  if (req.query && req.query.region && req.query.region !== "Pakistan") {
    query = {
      ...query,
      location: { $regex: req.query.region, $options: "i" },
    };
  }

  try {
    if (!query || query === "") {
      events = await EventModel.find({ status: "active" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      events = await EventModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    const count = await EventModel.countDocuments(query);
    res.json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

const getEvent = catchError(async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  res.status(200).json(event);
});

// Update
const updateEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const e = await EventModel.findById(id);
  if (e.creatorId !== req.userId) {
    res.status(403);
    return;
  }
  const event = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(event);
});

// Delete
const deleteEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const event = await EventModel.findById(id);
  console.log(event);
  if (event && event.creatorId.toString() === req.userId) {
    const _event = await EventModel.findByIdAndDelete(id);
    res.status(200).json(_event);
    return;
  } else {
    res.send(403);
  }
});

// Query
const queryEvents = catchError(async (req, res) => {
  const query = req.body;
  const pipeline = [];

  if (query["tags"]) {
    pipeline.push({});
  }
  if (query.category) {
    pipeline.push({
      $match: {
        category: query.category,
      },
    });
  }
  if (query.title) {
    pipeline.push({
      $match: {
        title: query.title,
      },
    });
  }
  if (query.description) {
    pipeline.push({
      $match: {
        description: query.description,
      },
    });
  }
  console.log(pipeline);

  const events = await EventModel.aggregate(pipeline);
  res.status(200).json(events);
});

const addUserToEvent = catchError(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!userId) {
    res.status(400).json("No user found")
    return;
  }
  const event = await EventModel.findById(id);
  if (!event) {
    return res.status(400).send("Competition not found");
  }

  if (event.participants.includes(userId)) {
    res.status(400).send("User already in event");
    return;
  } else if (event.max_participants >= event.current_participants) {
    const event = await EventModel.findByIdAndUpdate(
      id,
      { $push: { participants: userId }, $inc: { current_participants: 1 } },
      { new: true }
    );

    res.json(event);
  } else {
    return res.status(400).send("Event is full");
  }
});


const getUserEvents = async(req, res)=>{
  const userId = req.userId;
  try {
    const event = await EventModel.find({creatorId:userId})
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export {
  createEvent,
  getUserEvents,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  queryEvents,
  addUserToEvent,
};
