import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async (req:NextApiRequest, res: NextApiResponse) =>{
    try {
        const client = await clientPromise;
        const db = client.db("mflix");
        const movies = await db.collection("movies").find({}).sort({metacritic:-1}).limit(20).toArray();
        res.json(movies);
    } catch (error) {
        console.log(error);
    }
}