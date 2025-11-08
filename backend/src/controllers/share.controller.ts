import linkModel from "../model/link.model.js";
import generateRandomHash from "../utils.js";
import type { Request, Response } from "express";

export const createShareableLink = async (req: Request, res: Response) => {
    try {
        const { share } = req.body;
        //@ts-ignore
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        if (share) {
            const hash = generateRandomHash(20);

            await linkModel.findOneAndUpdate(
                { userId },
                { hash },
                { upsert: true, new: true }
            );

            return res.status(200).json({ msg: "Link shared successfully", hash });
        } else {
            await linkModel.deleteMany({ userId });
            return res.status(200).json({ msg: "Link unshared successfully", hash: null });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error", error });
    }
};

export const getShareableLink = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const link = await linkModel.findOne({ userId });

        if (!link) {
            return res.status(404).json({ msg: "No shareable link found" });
        }

        return res.status(200).json({ hash: link.hash });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error", error });
    }
};
