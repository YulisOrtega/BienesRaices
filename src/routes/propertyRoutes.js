import  Express from "express";
import {
    deleteProperty,
    findAllByUserProperties,
    findAllProperty,
    findOneProperty,
    insertProperty,
    updateProperty,
    formProperty,
    saveProperty
} from "../controllers/propertyController.js";
const router=Express.Router();

router.get("/create/", formProperty);
router.post("/create/", saveProperty)

export default router;