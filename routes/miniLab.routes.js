const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const miniLabController = require("../controller/miniLab.controller");

function getMiniLabRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getMiniLabList", miniLabController.getMiniLabList);
    router.get("/getMatrices", miniLabController.getMiniLabMatrices);

    router.get("/getCustomer/:customerId/:admissionId", miniLabController.getCustomerTests);

    //PATCH
    router.patch("/updateMiniLabStatus/:customerId/:admissionId", miniLabController.updateMiniLabStatus)

    
    return router;

}
module.exports = getMiniLabRoutes(); 