const miniLabService = require('../service/miniLab.service');
const customerService = require('../service/customer.service');

//Get Patient List for Mini Lab
async function getMiniLabList(req, res) {
    try {
        // Get the user role id
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Mini Lab Operators can view Patients for mini lab." });
        }

        const result = await miniLabService.getMiniLabList();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Customer Tests For Mini Lab
async function getCustomerTests(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Mini Lab Operators Can View Customer Tests." });
        }

        //Get Customer Details
        const resultCustomer = await customerService.getCustomerBioData(customerId, admissionId);
        
        if(resultCustomer.error) {
            return res.status(resultCustomer.status).json ({
                error: true,
                payload: resultCustomer.payload
            })
        }

        //Get Customer Tests
        const resultTests = await miniLabService.getCustomerTests(customerId, admissionId);

        if(resultTests.error) {
            return res.status(resultTests.status).json ({
                error: true,
                payload: resultTests.payload
            })
        }

        const result = {
            status: 200,
            payload: {
                //bio data
                customer: resultCustomer?.payload,
                //tests
                tests: resultTests?.payload,
            }
        }

        return res.status(result.status).json ({
            error: false,
            payload: result.payload
        })
                  
    } catch (error) {
        console.log("Error Getting Customer Tests Mini Lab Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Update Mini Lab Status Of Customer

async function updateMiniLabStatus(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const statusId = req.body;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can View Customer Tests." });
        }

        const result = await miniLabService.updateMiniLabStatus(customerId, admissionId, statusId);

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
        console.log("Error Updating Customer MiniLab Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Mini Lab Matrices
async function getMiniLabMatrices(req, res) {
    try {
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await miniLabService.getMiniLabMatrices();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Matrices Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    getMiniLabList,
    getCustomerTests,
    updateMiniLabStatus,
    getMiniLabMatrices
}