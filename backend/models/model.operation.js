export const defineOperation = (Sequelize) => { // таблица с операциями
    return {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        }, 
        userId: { 
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        operationType: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        userName: { 
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        purchase: { 
            type: Sequelize.JSON,
            allowNull: true,
        }, 
        barter: { 
            type: Sequelize.JSON,
            allowNull: true,
        }, 
        contribution: { 
            type: Sequelize.STRING,
            allowNull: true,
        }, 
    }
}