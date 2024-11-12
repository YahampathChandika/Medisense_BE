const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const miniLabController = require("../controller/miniLab.controller");
const xRayController = require("../controller/xray.controller");


function getXRayRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getXRayList", xRayController.getXRayList);
    router.get("/getCustomer/:customerId/:admissionId", xRayController.getCustomer);
    router.get("/getMatrices", xRayController.getXRayMatrices);

    // //PATCH
    router.patch("/updateXRayStatus/:customerId/:admissionId", xRayController.updateXRayStatus)

    
    return router;

}
module.exports = getXRayRoutes(); 