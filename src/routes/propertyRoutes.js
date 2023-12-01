import  Express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
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
const router=Express.Router();

//router.get("/create/", formProperty);
router.get("/create/", protectRoutes, formProperty)
router.post("/create/", protectRoutes, saveProperty);
router.get("/create/addImage/:idProperty", protectRoutes, formAddImage);
router.post("/create/loadImage/:idProperty", protectRoutes, loadImage);

export default router;