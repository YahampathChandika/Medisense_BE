const dropdownService = require('../service/dropdown.service');

//Get Cashier Payment Methods Dropdown
async function getPaymentMethods(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can Select Payment Methods." });
        }

        const result = await dropdownService.getPaymentMethods();

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
        console.log("Error Getting Payment Methods Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error 
        })
    }
}

//Get bank dropdowns
async function getBanks(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can Select Payment Methods." });
        }

        const result = await dropdownService.getBanks();

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
        console.log("Error Getting Payment Methods Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Credit Approvers dropdowns
async function getCreditApprovers(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can get credit approvers." });
        }

        const result = await dropdownService.getCreditApprovers();

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
        console.log("Error Getting Credit Approvers Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Mini Lab Status dropdowns
async function getMiniLabStatus(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 6].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Mini Labs Can get mini lab status." });
        }

        const result = await dropdownService.getMiniLabStatus();

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
        console.log("Error Getting Mini Lab Status Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Lab Status dropdowns
async function getLabStatus(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 5].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Labs Can get lab status." });
        }

        const result = await dropdownService.getLabStatus();

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
        console.log("Error Getting Lab Status Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get X-Ray Status dropdowns
async function getXRayStatus(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 8].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and xRay Can get lab status." });
        }

        const result = await dropdownService.getXRayStatus();

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
        console.log("Error Getting X-Ray Status Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Radigraphers Status dropdowns
async function getRadiographers(req, res) {
    try {

        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 8].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and xRay Can get lab status." });
        }

        const result = await dropdownService.getRadiographers();

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
        console.log("Error Getting Radiographers Dropdown Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}







module.exports = {
    getPaymentMethods,
    getBanks,
    getCreditApprovers,
    getMiniLabStatus,
    getLabStatus,
    getXRayStatus,
    getRadiographers
}