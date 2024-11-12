const labService = require('../service/lab.service');
const customerService = require('../service/customer.service');

//Get Patient List for Lab
async function getCustomerList(req, res) {
    try {
        // Get the user role id
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Lab Operators can view Patients for mini lab." });
        }

        const result = await labService.getCustomerList();

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
        console.log("Error Getting Customer List For Lab Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

// Add Test results for Lab
async function addTestResults(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const testResults = req.body;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Mini Lab Operators Can View Customer Tests." });
        }
        
        const result = await labService.addTestResults(testResults, customerId, admissionId);
        
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
        });
    }
}

module.exports = {
    getCustomerList,
    addTestResults
}