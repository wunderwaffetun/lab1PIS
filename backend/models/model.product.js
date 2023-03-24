export const defineProduct = (Sequelize) => {
    return {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        cost: { 
            type: Sequelize.INTEGER,
            allowNull: false,
        }, 
        count: { // число в бд 
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }
}