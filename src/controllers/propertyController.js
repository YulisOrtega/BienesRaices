import { request } from "express";
import Category from "../models/Category.js";
import Price from "../models/Price.js";
import Property from "../models/Property.js";
import { check, validationResult } from "express-validator";

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
const formProperty = async (request, response) => {
    console.log("Mostrando el formulario para la creación de una nueva Propiedad");
    console.log(request.body);

    const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()])
    response.render("property/create", {
        page: "New Property",
        showHeader: true,
        data: request.body,
        categories,
        prices
    })
}

const saveProperty = async (request, response) => {
    await check("title").notEmpty().withMessage("The title is required").isLength({ min: 10, max: 100}).withMessage("The title property must have between 10 and 100 characters").run(request)

    await check("description").notEmpty().withMessage("The description is required").run(request)

    await check("category").notEmpty().withMessage("All properties must be categorized").isInt({ min: 1, max: 5 }).withMessage("The category is required").run(request)

    await check("priceRange").notEmpty().withMessage("All properties must have a price").isInt({ min: 1, max: 8 }).withMessage("The price is required").run(request)

    await check("nRooms").isInt({ min: 0, max: 10 }).withMessage("The number of rooms is required").run(request)

    await check("nWC").isInt({ min: 0, max: 5 }).withMessage("The number of WC is required").run(request)

    await check("pLot").isInt({ min: 0, max: 5 }).withMessage("The number of parking lot is required").run(request)

    await check("street").notEmpty().withMessage("The name of the street is required").run(request)
    console.log(`La calle que esta mostrando es:  ${request.body.street}`)

    await check("lat").isFloat({ min: -90, max: 90 }).withMessage("the latitude is required").run(request)

    await check("lng").isFloat({ min: -180, max: 180 }).withMessage("The length is required.").run(request)

    let resultValidate = validationResult(request);
    console.log(`street: ${request.body.street} ggyfytfjytry`)
    let data = request.body
    console.log(data);

    const { title, description, nRooms, pLot, nWC, priceRange, category, street, lat, lng } = request.body

    if (resultValidate.isEmpty()) {
        const loggedUser=request.User.id
        const savedProperty = await Property.create({
            title,
            description,
            nRooms,
            pLot,
            nWC,
            price_ID: priceRange,
            category_ID: category,
            address: street,
            lat,
            lng,
            user_ID: loggedUser,
        })

        const uuidProperty = savedProperty.id
        response.redirect(`./create/addImage/${uuidProperty}`)
    }
    else {
        const [categories, prices] = await Promise.all([Category.findAll(), Price.findAll()])
        response.render('property/create', {
            page: 'New property',
            showHeader: true,
            categories,
            prices,
            data: request.body,
            errors: resultValidate.array(),
            propertyData: {
                title, description, category, priceRange, nRooms, nWC, pLot, street, lat, lng
            },

        });

    }
}

const formAddImage = async (request, response) => {
    const { id } = request.params
    console.log(`Params: ${request.params.id}`)
    const searchedProperty = await Property.findByPk(id)//Selec * From tbb_propiedades where ID = id
    if (!searchedProperty) {
        console.log('La propiedad buscada no existe')
        response.redirect('login/home')
    } else {
        console.log('La propiedad si existe')
        //TODO: Validar que quien esta conectado sea el dueño de la propiedad.
        if (searchedProperty.published) {
            console.log('La propiedad ha sido publicad y las fotos y las fotos no pueden ser modificadas')
            response.render('login/home')
        } else {
            response.render('property/addImage', {
                page: 'Add Image to Property',
                propertyID:searchedProperty.id
            })

        }
    }
}           


        const loadImage = async (request, response) => {
            const { id } = request.params

            //Validar que la propiedad exista.
            const searchedProperty = await Property.findByPk(id)//Select * From tbb_propiedades where ID = id

            if (!searchedProperty) {
                console.log('La propiedad buscada no existe')
                response.redirect('login/home')
            } else {
                console.log('La propiedad si existe')
                //TODO: Validar que quien esta conectado sea el dueño de la propiedad.
                if (searchedProperty.published){
                    console.log('La propiedad ha sido publicad y las fotos y las fotos no pueden ser modificadas')
                response.render('login/home')
                }
            }
            //TODO: validar que la propiedad este validada.
        }
    

export {
    loadImage, 
    formAddImage, 
    insertProperty, 
    deleteProperty, 
    updateProperty, 
    findAllProperty, 
    findAllByUserProperties, 
    findOneProperty, 
    formProperty, 
    saveProperty,

} 