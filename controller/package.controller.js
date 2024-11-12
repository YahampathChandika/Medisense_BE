const packageService = require("../service/package.service");

//Create New Package
async function createPackage(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const package = req.body;
        const tests = req.body.tests;
        package.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create tests."});
        }

        const resultPackage = await packageService.createPackage(package);

        if(resultPackage.error) {
            return res.status(resultPackage.status).json ({
                error: true,
                payload: resultPackage.payload
            })
        } 


        const resultPackageTests = await packageService.createPackageTests(tests, resultPackage.payload.id);

        if(resultPackageTests.error) {
            //delete the created package
            await packageService.deletePackage(resultPackage.payload.id);
            
            return res.status(resultPackageTests.status).json ({
                error: true,
                payload: resultPackageTests.payload
            })
        } else {
            return res.status(resultPackageTests.status).json ({
                error: false,
                payload: resultPackageTests.payload
            })
        } 


    } catch (error) {
        console.log("Error Creating Package Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get All Packages
async function getAllPackages(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create tests."});
        }

        const result = await packageService.getAllPackages();

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        console.log("Error Getting Package Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Delete Package
async function deletePackage(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create tests."});
        }

        const result = await packageService.deletePackage(id);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        console.log("Error Deleting Package Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Get Package By ID
async function getPackageById(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins Can View Packages."});
        }

        const result = await packageService.getPackageById(id);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        console.log("Error Getting Package Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Update Package 
async function updatePackage(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins Can Update Packages."});
        }

        const result = await packageService.updatePackage(id);

        if(result.error) {
            return res.status(result.status).json({
                error: true,
                payload: result.payload
            });
        } else {
            return res.status(result.status).json({
                error: false,
                payload: result.payload
            });
        }

    } catch (error) {
        console.log("Error Updating Package Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

module.exports = {
    createPackage,
    getAllPackages,
    deletePackage,
    getPackageById
}