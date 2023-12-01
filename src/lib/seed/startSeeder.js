import {exit} from "node:process";
import categories from "./categories.js";
import Category from "../../models/Category.js";
import db from "../../config/db.js";
import Price from "../../models/Price.js";
import prices from "./prices.js";
import { truncate } from "node:fs";
import { QueryTypes } from "sequelize";
import users from './users.js';
import User from "../../models/User.js";


const importData = async ()=>{
    try {
        //Autenticar
        await db.authenticate()

        //Generar las columnas
        await db.sync()

        //Insertamos los datos
        await Promise.all([
        Category.bulkCreate(categories),
        Price.bulkCreate(prices),
        User.bulkCreate(users)
    ])
        console.log('Datos importados correctamente')
        exit()

    } catch(error){
        console.log(error)
        exit(1)
    }
}

const deleteData = async ()=>{
    try {
        await Promise.all([
            Category.destroy({
                where:{}, truncate:false
            }),
            db.query("Alter table tbc_categories auto_increment=1"),
            Price.destroy({
                where:{}, truncate:false
            }),
            db.query("Alter table tbc_prices auto_increment=1"),
            User.destroy({
                where: {}, truncate: false
            }),
            db.query("ALTER TABLE tbb_users AUTO_INCREMENT=1"),
        ])
    }
    catch(error){
        console.log(error)
        exit(1)
    }
}
if (process.argv[2]==="-i"){
    importData();
}
if (process.argv[2]==="-d"){
    deleteData();
}
