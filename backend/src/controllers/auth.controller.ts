import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import { z } from "zod";
import type { Request, Response } from "express";


const userSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(5).max(13),
});

export const signup = async (req: Request, res: Response) => {
    try {
        const parsed = userSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input",
                error: parsed.error.issues,
            });
        }

        const { username, password } = parsed.data;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "Username already taken." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });


        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });

        return res.status(201).json({
            message: "User registered successfully!",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        msg: "Invalid input",
        error: parsed.error.issues,
      });
    }

    const { username, password } = parsed.data;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User does not exist." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

