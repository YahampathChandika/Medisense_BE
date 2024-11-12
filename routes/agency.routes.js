const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const agencyController = require("../controller/agency.controller")

function getAgencyRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/addAgency", agencyController.createAgency);
    router.get("/getAllAgencies", agencyController.getAllAgencies);
    router.get("/getAgencyById/:id", agencyController.getAgencyById);
    router.delete("/deleteAgency/:id", agencyController.deleteAgency);
    router.patch("/updateAgency/:id", agencyController.updateAgency);
    
    return router;

}
module.exports = getAgencyRoutes(); 