import { request, response } from "express";

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

const formProperty = (request, response)=>{
    console.log("Mostrando el formulario para la creación de una nueva propiedad")
    response.render("property/create", {
        page: "New Property",
        showHeader: true,
        data:request.body
    })
}

const saveProperty= async(request, response)=>{
    console.log("Validar y guardar datos en la BD")
    response.json({
        msg:"La propiedad ha sido guardada"
    })
}

export {
    insertProperty, deleteProperty, updateProperty, findAllProperty, findAllByUserProperties, findOneProperty, formProperty, saveProperty
} 