const testService = require("../service/test.service");

//Create New Test
async function createTest(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const test = req.body;
        test.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create tests."});
        }

        const result = await testService.createTest(test);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Creating Test Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get all Tests
async function getAllTests(req, res) {
    try {
        const userRole_id = req.user.roleId;
        
        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view tests."});
        }

        const result = await testService.getAllTests();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting Tests Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get test by ID
async function getTestById(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;
        
        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view tests."});
        }

        const result = await testService.getTestById(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 


    } catch (error) {
        console.log("Error Getting Test By ID Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Delete Test
async function deleteTest(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can delete tests."});
        }

        const result = await testService.deleteTest(id);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 


    } catch (error) {
        console.log("Error Deleting Test Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Update Test 
async function updateTest(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        const updatedData = req.body;

        delete updatedData.testCode

        const result = await testService.updateTest(id, updatedData);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Updating Test Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    createTest,
    getAllTests,
    getTestById,
    deleteTest,
    updateTest
}