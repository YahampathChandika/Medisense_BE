const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const jobController = require("../controller/job.controller")

function getJobRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    router.post("/addJob", jobController.createJob);
    router.get("/getAllJobs", jobController.getAllJobs);
   
    
    return router;

}
module.exports = getJobRoutes(); 