const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const testController = require("../controller/test.controller")

function getTestRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/addTest", testController.createTest);
    router.get("/getAllTests", testController.getAllTests);
    router.get("/getTestById/:id", testController.getTestById);
    router.delete("/deleteTest/:id", testController.deleteTest);
    router.patch("/updateTest/:id", testController.updateTest);


    return router;
}

module.exports = getTestRoutes();