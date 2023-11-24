import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({path:"src/.env"})
//console.log(`bd: ${process.env.bd_name}, user:${process.env.bd_user}, contraseña: ${process.env.bd_password}`)

const db = new Sequelize(process.env.bd_name,process.env.bd_user,process.env.bd_password, {
    host: process.env.bd_host, 
    port:"3306",
    dialect:"mysql",//lenguaje especifico que sql va a utilizar
    timezone:"America/Mexico_City",//agregar datos en la hora correspondiente
    define:{timestamp:true},
    pool:{ 
        max:5,
        min:0,
        acquire:30000,
        idle:1000,
        operatorAliases:false
    }
});

export default db;