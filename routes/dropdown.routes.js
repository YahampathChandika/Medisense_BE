const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const dropdownController = require("../controller/dropdown.controller")

function getDropdownRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getPaymentMethods", dropdownController.getPaymentMethods);
    router.get("/getBanks", dropdownController.getBanks);
    router.get("/getCreditApprovers", dropdownController.getCreditApprovers);
    router.get("/getMiniLabStatus", dropdownController.getMiniLabStatus);
    router.get("/getLabStatus", dropdownController.getLabStatus);
    router.get("/getXRayStatus", dropdownController.getXRayStatus);
    router.get("/getRadiographers", dropdownController.getRadiographers);

    
    return router;

}
module.exports = getDropdownRoutes(); 