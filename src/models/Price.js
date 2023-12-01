import { DataTypes } from "sequelize";
import db from "../config/db.js"

const Price = db.define('tbc_prices',{
    name:{
        type: DataTypes.STRING(30),
        allowNull: false
    }
})

export default Price;