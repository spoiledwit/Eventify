import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { catchError } from "../utils/catchError.js";
import EventModel from "../models/Event.js";
import dotenv from "dotenv";
dotenv.config();

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, tags } = req.body;

    // Check if the user exists
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exists");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await UserModel.create({
      name,
      email,
      hashedPassword: encryptedPassword,
      tags
    });

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials");
    }

    // Create token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }}

export const addToWishlist = catchError(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(req.userId);
    // checking if already in wishlist
    if (user.wishlist.includes(id)) {
      return res.status(200).json({ message: "Already in wishlist" });
    }
    user.wishlist.push(id);
    await user.save();
    res.status(200).json({ wishlist: user.wishlist, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
})

export const removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(req.userId);
    user.wishlist = user.wishlist.filter((item) => item !== id);
    await user.save();
    res.status(200).json({ wishlist:user.wishlist, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
}

export const getWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    // checking if wishlist is empty
    if (user.wishlist.length === 0) {
      return res.status(200).json({ wishlist: [] });
    }
    const wishlist = await EventModel.find({ _id: { $in: user.wishlist } });
    res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false })
  }
}