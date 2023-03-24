import { db } from "../models/index.js";
import { operations } from "./main.controller.js";

class UsersGeneral {
    async getUsers(req, res, next){
        db.user.findAll()
            .then((response, err) => {
                res.status(200).json({users: response})
            })
    }
    async completeOrder(req, res, next){
        const orederType = req.body.orderType
        console.log(orederType)

        switch(orederType){
            case 'online':
                operations.online(req, res, next)
                return
            case 'offline':
                operations.offline(req, res, next)
                return
            case 'debt': 
                operations.credit(req, res, next)
                return 
            case 'barter':
                operations.barter(req, res, next)
                return
            case 'contribution': 
                operations.contribution(req, res, next)
                return 
            default: 
                res.status(401).json({message: "No such request"})
                return;
        }
    }
}

export const UsersInstance = new UsersGeneral()