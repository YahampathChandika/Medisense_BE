const express = require("express");
const userRoutes = require("./user.routes");
const testRoutes = require("./test.routes");
const packageRoutes = require("./package.routes");
const agencyRoutes = require("./agency.routes");
const countryRoutes = require("./country.routes");
const jobRoutes = require("./job.routes");
const customerRoutes = require("./customer.routes");
const cashierRoutes = require("./cashier.routes");
const labRoutes = require("./lab.routes");
const miniLabRoutes = require("./miniLab.routes");
const dropdownRoutes = require("./dropdown.routes");
const xRayRoutes = require("./xRay.routes");

function routes() {

    const router = express.Router();

    router.use("/user", userRoutes); 
    router.use("/test", testRoutes);
    router.use("/package", packageRoutes);
    router.use("/agency", agencyRoutes);
    router.use("/country", countryRoutes);
    router.use("/job", jobRoutes);
    router.use("/customer", customerRoutes);
    router.use("/cashier",cashierRoutes);
    router.use("/lab",labRoutes);
    router.use("/miniLab",miniLabRoutes);
    router.use("/dropdown",dropdownRoutes);
    router.use("/xRay", xRayRoutes);

    
    return router;
}

module.exports = routes();
 