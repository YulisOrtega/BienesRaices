import dotenv from "dotenv";
dotenv.config({path:"src/.env"});
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoutes = async(request, response,next)=>{
    console.log("Hola desde middleware") 
    //TODO: Verificar si hay un token
    const {_token}=request.cookies
    if(!_token){
        return response.redirect("/login");
    }
    //TODO: verificar el token
    try{
        const decodedJWT = jwt.verify(_token, process.env.JWT_HASHSTRING)
        //console.log(decodedJWT)
        const loggedUser = await User.findByPk(decodedJWT.userId)
        if(!loggedUser){
            return response.clearCookie("_token").redirect("/login")
        }else{
            request.User=loggedUser
        }
    } catch(error){
        return response.clearCookie("_token").redirect("/login")
    }
    next()
}
export default protectRoutes;