const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const labController = require("../controller/lab.controller");
const miniLabController = require("../controller/miniLab.controller");

function getLabRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getLabList", labController.getCustomerList);
    router.get("/getCustomer/:customerId/:admissionId", miniLabController.getCustomerTests);

    //PUT
    router.patch("/updateLabResults/:customerId/:admissionId", labController.addTestResults);
    
    return router;

}
module.exports = getLabRoutes(); 