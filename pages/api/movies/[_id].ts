import { NextApiRequest, NextApiResponse } from "next";

export default  (req: NextApiRequest, res: NextApiResponse)=>{
    try {
        const { _id } = req.query;
        
    } catch (error) {
        console.log(error);
    }
}