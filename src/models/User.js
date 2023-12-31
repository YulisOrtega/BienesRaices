//Elemento del ORM que permite definir los tipos de datos de las propiedades (columnas en la BD)
import { DataTypes } from "sequelize";
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const User = db.define("tbb_users",
{
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token:{
        type: DataTypes.STRING,  
        unique: true,
        defaultValue: null
    },
    verified:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    hooks: {
        beforeCreate: async (User) =>{
            const salt = await bcrypt.genSalt(10);
            User.password = await bcrypt.hash(User.password, salt);
        }
    }
})
//comparar contraseñas (Contraseña pasada como param y la contraseña de la bd(user))
User.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

export default User;