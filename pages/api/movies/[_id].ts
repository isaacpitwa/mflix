import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default  async (req: NextApiRequest, res: NextApiResponse)=>{
    try {
        const { _id } = req.query;
        if(!_id){
            return res.status(400).json({message : "Missing movie id"});
        }
        const client  =  await clientPromise;
        const db = client.db("mflix");
        const movie = await db.collection("movies").findOne({_id : new ObjectId(_id.toString())});
        res.json(movie);
    } catch (error) {
        console.log(error);
    }
}