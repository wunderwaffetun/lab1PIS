import { db } from "../models/index.js";

export async function saveOperation(req, res, next){

    const data = req.body
    const user = await db.user.findOne({where: {id: data.userId}})
    const userName = await user.dataValues.name

    db.operations.create({
        operationType: data.orderType,
        userId: data.userId,
        userName: userName,
        purchase: data.purchases,
        barter: data.barter, 
        contribution: data.contribution
    }).then(() => {
        res.status(200).json({message: 'Completed request'})
    }).catch(err => console.log('sfasfd',err))
}