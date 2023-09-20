const storeSchema = require(`../Models/Stores`)
import {Request , Response} from 'express'
async function addStore(req: Request, res: Response): Promise<void> {
    try {
        const { storeName , userName } = req.body; // Extract storeName from the request body
        if(!storeName) {
            res.status(404).json({error:`Store name is required`})
        }
        if(!userName) {
            res.status(404).json({error:`Unathorized`})
        }
        const newStore = await storeSchema.create({
            name: storeName,
            userName:userName 
        });
        res.status(201).json({ store: newStore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to Add Store' });
    }
}
//Fetch Store by UserName
const fetchStoreByUserName = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params; 
        console.log(userId, `userId`);
        if(!userId){
            return res.status(400).json({error:`USER NAME IS REQUIRED`})
        }
        const stores = await storeSchema.find({ userId:userId });
        console.log(stores, `stores`);

        if (!stores || stores.length === 0) {
            return res.status(404).json({ error: `No Stores found` });
        }

        res.status(200).json({ stores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
};
module.exports={
    addStore,
    fetchStoreByUserName,
}