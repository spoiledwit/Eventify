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

async function expireEvent() {
  try {
    const currentDate = new Date();
    const expiredEvents = await EventModel.find({ status: 'active', endDate: { $lte: currentDate }, recurring: false });
    
    for (const event of expiredEvents) {
      event.status = 'expired';
      await event.save();
    }
    
    console.log(`${expiredEvents.length} event expired.`);
  } catch (error) {
    console.error('Error expiring event:', error);
  }
}

// Schedule the function to run every midnight
cron.schedule('* * * * *', expireEvent);