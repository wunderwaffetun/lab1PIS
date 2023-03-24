import { db } from "./index.js";

//Нужно раскомментировать sequelize sync в index.js


export async function initialData(){
    db.product.create({
        name: 'Утюг', 
        cost: 1800,
        count: 6
    });
    db.product.create({
        name: 'Пылесос', 
        cost: 1800,
        count: 6
    });
    db.product.create({
        name: 'Телевизор', 
        cost: 2800,
        count: 2
    });
    db.product.create({
        name: 'Полка', 
        cost: 100,
        count: 190,
    });
    db.product.create({
        name: 'Шкаф', 
        cost: 12,
        count: 10,
    });
    // Users
    db.user.create({
        name: 'Николай', 
        debt: 0, 
        loan_ceiling: 1000000,
        remains: 1000000, 
        money: 0,
        comment: 'No debts'
    });
    db.user.create({
        name: 'Дима', 
        debt: 10000, 
        loan_ceiling: 11000,
        remains: 1000, 
        money: 0,
        comment: '>90%'
    });
    db.user.create({
        name: 'Иван', 
        debt: 20000, 
        loan_ceiling: 20000,
        remains: 0, 
        money: 12000,
        comment: 'unemployed'
    });
    db.user.create({
        name: 'Константин', 
        debt: 500, 
        loan_ceiling: 100000,
        remains: 99500, 
        money: 800,
        comment: 'Almost '
    })
}
