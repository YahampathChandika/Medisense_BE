const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const cashierController = require("../controller/cashier.controller")

function getCashierRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //GET
    router.get("/getCashierList", cashierController.getCashierList);
    router.get("/getCashierListMatrices", cashierController.getCashierListMatrices);
    router.get("/getCustomerWithTestsAndPackages/:customerId/:admissionId", cashierController.getCustomerWithTestsAndPackages);

    //PATCH
    router.patch("/addCustomerPayment/:customerId/:admissionId", cashierController.addCustomerPayment);

    
    return router;

}
module.exports = getCashierRoutes(); 