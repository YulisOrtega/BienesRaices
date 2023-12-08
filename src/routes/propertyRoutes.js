import  express from "express";
import {
    deleteProperty,
    findAllByUserProperties,
    findAllProperty,
    findOneProperty,
    insertProperty,
    updateProperty,
    formProperty,
    saveProperty,
    formAddImage,
    loadImage,

} from "../controllers/propertyController.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router= express.Router();

//router.get("/create/", formProperty);
router.get("/create/", protectRoutes, formProperty)
//router.post("/create/", protectRoutes, saveProperty);
router.post("/create/", protectRoutes, saveProperty);
router.get("/create/addImage/:id", protectRoutes, formAddImage);
router.post("/create/loadImage/:id", protectRoutes, loadImage);
//router.post("/create/addImage/:id", protectRoutes, upload.single('imageBox'), loadImage)



export default router;