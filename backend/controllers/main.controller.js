import { db } from "../models/index.js";


async function checkProducts (purchases) { // Проверяет есть ли продукты в бд и не будет ли отрицаетельное число товаров
    const findProducts = purchases.map( purchase => { // Массив промисов

        return db.product.findByPk(purchase.id)
            .then( prod => {
                if (prod){
                    if(prod.count >= purchase.quantity){
                        return db.product.findByPk(purchase.id)
                    } else {
                        return new Error('there are no so much prods')
                    }
                } else return new Error('no such product')
            })
            
    })
    return Promise.all(findProducts)
        .then(responses => {
            const err = responses.find((product) => {
                return product instanceof Error
            })
            return err || responses
        })
        
        .catch(err => console.log(err, 'asdfawdfew'))
}




async function reduceProducts(products){ //уменьшение кол-ва продуктов в дб при покупке, возможна ошибка т.к. операция не синхронна, нужны транзакции 
    products.forEach(product => {
        db.product.findByPk(product.id)
            .then((prod) => {
                // prod.update({count: prod.dataValues.count - product.quantity})
                prod.decrement('count', {by: product.quantity})
            })
    });
}

async function increaseProducts(products){ //увеличение кол-ва продуктов в дб при покупке, возможна ошибка т.к. операция не синхронна, нужны транзакции 
    console.log(products)
    products.forEach(product => {
        db.product.findByPk(product.id)
            .then((prod) => {
                console.log(product.quantity)
                prod.increment('count', {by: product.quantity})
            })
    });
}



async function TotalCost(purchases){ // Подсчёт стоимости всех товаров 
    
    const products = purchases.map( purchase => {
        return db.product.findByPk(purchase.id)
    })

    return Promise.all(products)
        .then( responses => {
            let totalCost = 0
            responses.forEach( (product, i) => {
                totalCost += purchases[i].quantity * product.dataValues.cost
            })
            return totalCost
        })
}   


const online = async (req, res, next) => {
    const {userId: id, purchases} = req.body
    const products = await checkProducts(purchases)
    if (products instanceof Error){
        console.log(products)
        res.status(403).json({message: `${products}`})
    } else {
        const totalCost = await TotalCost(purchases)
        return db.user.findOne({ where: {id: id}})
            .then((user) => {
                if(user.dataValues.money >= totalCost){
                    reduceProducts(purchases)
                    user.update({money: user.dataValues.money - totalCost})
                    next()
                } else res.status(403).json({message: "Not enough money"})
                console.log(user.dataValues)
            })
            .catch(err => err)
    }
}

const offline = async (req, res, next) => {
    const {userId: id, purchases} = req.body
    const products = await checkProducts(purchases)
    if (products instanceof Error){
        console.log(products)
        res.status(403).json({message: `${products}`})
    } else {
        return db.user.findOne({ where: {id: id}})
            .then((user) => {
                    reduceProducts(purchases)
                    next()
                })
            .catch(err => err)
    }
}

const barter = async (req, res, next) => {
    const {userId: id, barter} = req.body
    const changeFrom = await checkProducts(barter.from)
    const changeTo = await checkProducts(barter.to)
    if (changeFrom instanceof Error || changeTo instanceof Error){
        console.log(changeFrom)
        res.status(403).json({message: `${'not enough products for trade at stock'}`})
    } else {
        const totalCostFrom = await TotalCost(barter.from)
        const totalCostTo = await TotalCost(barter.to)
        return db.user.findOne({ where: {id: id}})
            .then((user) => {
                if(totalCostFrom === totalCostTo){
                    reduceProducts(barter.to)
                    increaseProducts(barter.from)
                    next()
                } else res.status(403).json({message: "Not corresponding price"})
                console.log(user.dataValues)
            })
            .catch(err => err)
    }
}



const credit = async (req, res, next) => { 
    const {userId: id, purchases} = req.body
    const products = await checkProducts(purchases)
    if (products instanceof Error){
        console.log(products)
        res.status(403).json({message: `${products}`})
    } else {
        const totalCost = await TotalCost(purchases)
        return db.user.findOne({ where: {id: id}})
            .then((user) => {
                const data = user.dataValues
                const totalMoney = data.remains + data.money
                console.log(data)
                if( totalMoney >= totalCost){
                    reduceProducts(purchases)
                    if(data.money >= totalCost){
                        user.update({money: user.dataValues.money - totalCost})
                            .then(() => next())
                    } else {
                        const addDebt = totalCost - data.money
                        user.update({
                            money: 0,
                            debt: data.debt + addDebt,  
                            remains: data.remains - addDebt
                        }).then(() => {
                            next()
                        })
                    }
                } else {
                    res.status(403).json({message: "too small remain and not enough money"})
                }
            })
            .catch(err => err)
    }
}

const contribution = async (req, res, next) => { // Внесение средств
    const {userId: id, contribution} = req.body
    return db.user.findOne({ where: {id: id}})
            .then((user) => {
                const data = user.dataValues
                console.log(data)
                if(data.debt){ // если есть долги
                    if(contribution > data.debt){
                        const addMoney = contribution - data.debt
                        user.update({ 
                            money: data.money + addMoney,
                            debt: 0, 
                            remains: data.loan_ceiling
                        })
                    } else {
                        user.update({ 
                            debt: data.debt - contribution, 
                            remains: data.remains + contribution
                        })
                    }
                } else { // если нет, просто ложаться на счёт 
                    user.update({ money: data.money + contribution})
                }
                console.log(data)
                next()
            })
            .catch(err => err)
}


export const operations ={
    online,
    barter,
    offline,
    credit,
    contribution
}
