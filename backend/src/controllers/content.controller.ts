import type { Request, Response } from "express";
import { z } from "zod";
import contentModel from "../model/content.model.js";

// Extend Express Request to include userId added by authMiddleware
// declare module "express-serve-static-core" {
//   interface Request {
//     userId?: string;
//   }
// }

// Zod validation schema
const contentSchema = z.object({
    link: z.string().url("Invalid link format"),
    type: z.string(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
});

export const addContent = async (req: Request, res: Response) => {
    try {
        const parsed = contentSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input",
                error: parsed.error.issues,
            });
        }
        //@ts-ignore
        if (!req.userId) {
            return res.status(401).json({ msg: "Unauthorized: Missing user ID" });
        }

        const { link, type, title, tags } = parsed.data;
        await contentModel.create({
            link,
            type,
            title,
            tags,
            //@ts-ignore
            userId: req.userId,
        });

        return res.status(201).json({ msg: "Content added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error", error });
    }
};

export const getContent = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        if (!req.userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        //@ts-ignore
        const contents = await contentModel.find({ userId: req.userId });
        return res.status(200).json(contents);
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
};

export const deleteContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //@ts-ignore
        if (!req.userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const content = await contentModel.findOneAndDelete({
            _id: id,
            //@ts-ignore
            userId: req.userId,
        });

        if (!content) {
            return res.status(404).json({ msg: "Content not found" });
        }

        return res.status(200).json({ msg: "Content deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
};
