import { request, response } from "express";
import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";

const insertProperty = (request, response)=>{
    response.render('property/create.pug')
}

const updateProperty = (request, response)=>{
    return 0
}

const deleteProperty = (request, response)=>{
    return 0
}

const findAllProperty = (request, response)=>{
    return 0
}

const findAllByUserProperties = (request, response)=>{
    return 0
}

const findOneProperty = (request, response)=>{
    return 0
}

const formProperty = async(request, response)=>{
    console.log("Mostrando el formulario para la creación de una nueva propiedad")
    console.log(request.body);
    const [categories, prices]= await Promise.all([Category.findAll(), Price.findAll()])
    response.render("property/create",{
        page: "New Property",
        showHeader: true,
        data:request.body,
        categories,
        prices
    })
}

const saveProperty= async(request, response)=>{
    //TODO: Realizar validaciones de los campos antes de intentar guardar
    //TODO: Implementar el autorellenado en el formulario
    console.log("Validar y guardar datos en la BD")
    const {title, description, nRooms, nParkinlots, priceRange, nWC, category, street, lat, lng}= request.body
    try{
        const loggedUser = request.User.id
        if(!loggedUser){
            console.log("El usuario existe")
            const saveProperty = await Property.create({
                title,
                description,
                nRooms,
                nParkinlots,
                nWC,
                price_ID: priceRange,
                category_ID: category,
                address:street,
                lat,
                lng,
                user_ID: loggedUser
            })
            response.redirect(`/property/create/addImage/${saveProperty.id}`)
            response.json({
                msg:"La propiedad ha sido guardada"
            })
        }
    }catch(error){
        return response.clearCookie("_token").redirect("/login")
    }
}
const formAddImage = (request, response)=>{
    response.render('property/addImage',{
        page: "Add Image to Property"
    })
}
const loadImage =(request, response)=>{
    return 0;
}
    

export {
    loadImage, formAddImage, insertProperty, deleteProperty, updateProperty, findAllProperty, findAllByUserProperties, findOneProperty, formProperty, saveProperty
} 