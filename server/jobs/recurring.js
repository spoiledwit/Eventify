import cron from 'node-cron';
import EventModel from '../models/Event.js';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
});

async function recurEvent() {
  try {
    const currentDate = new Date();

    const expiredEvents = await EventModel.find({ status: 'expired', endDate: { $lte: currentDate }, recurring: true });

    for (const event of expiredEvents) {
        event.status = 'active';
        event.startDate = new Date();
        event.endDate = new Date();
        event.endDate.setDate(event.endDate.getDate() + 7);
        await event.save();
    }
  } catch (error) {
    console.error('Error recurring events:', error);
}}

// Schedule the function to run every midnight
cron.schedule('* * * * *', recurEvent);