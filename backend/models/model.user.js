export const defineUser = (Sequelize) => {
    return {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        }, 
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        debt: { // текущий долг
            type: Sequelize.INTEGER,
            allowNull: false,
        }, 
        loan_ceiling: {// потолок кредита 
            type: Sequelize.INTEGER,
            allowNull: false,
        }, 
        remains: { // остаток кредита
            type: Sequelize.INTEGER,
            allowNull: false,
        }, 
        money: { // баланс 
            type: Sequelize.INTEGER,
            allowNull: false,
        }, 
        comment: {
            type: Sequelize.STRING,
            allowNull: false, 
        }, 
    }
}