import linkModel from "../model/link.model.js";
import generateRandomHash from "../utils.js";
import type { Request, Response } from "express";

export const createShareableLink = async (req: Request, res: Response) => {
    try {
        const {share}=req.body;
        //@ts-ignore
        const userId=req.userId;
        if(!userId){
            return res.status(401).json({msg:"Unauthorized"});
        }
        console.log(generateRandomHash(20));
        if(share){
            await linkModel.create({
                userId:userId,
                hash:generateRandomHash(20)
            })
        }
        else if(!share){
            await linkModel.deleteOne({
                userId:userId
            })
        }
        return res.status(200).json({msg:"Link share updated successfully"});   
    } catch (error) {
        return res.status(500).json({ msg: "Server Error", error });
    }
};

export const getShareableLink = async (req: Request, res: Response) => {};