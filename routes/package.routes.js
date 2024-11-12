const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const packageController = require("../controller/package.controller")

function getPackageRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/createPackage", packageController.createPackage);
    router.get("/getAllPackages", packageController.getAllPackages);
    router.get("/getPackageById/:id", packageController.getPackageById);
    router.delete("/deletePackage/:id", packageController.deletePackage);



    return router;
}

module.exports = getPackageRoutes();