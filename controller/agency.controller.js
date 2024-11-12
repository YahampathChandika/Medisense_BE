const agencyService = require("../service/agency.service");

//Create New Agency
async function createAgency(req, res) {
    try{
        const userRole_id = req.user.roleId;
        const agency = req.body;
        agency.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create agencies."});
    }

    const result = await agencyService.createAgency(agency);

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
        console.log("Error creating Agency controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get all Agencies
async function getAllAgencies(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view agencies."});
        }

        const result = await agencyService.getAllAgencies();

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
        console.log("Error creating Agency controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })    
    }
}

//Get Agency by Id
async function getAgencyById(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view details of an Agency."});
        }

        const result = await agencyService.getAgencyById(id);

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
        console.log("Error creating Agency controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })    
    }
}

//Delete an Agency
async function deleteAgency(req, res) {
    try{
    const userRole_id = req.user.roleId;
    const { id } = req.params;

    if (![1].includes(userRole_id)) {
        return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view details of an Agency."});
    }

    const result = await agencyService.deleteAgency(id);
 
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
        console.log("Error Deleting Agency Controller: ", error);
        return res.status(500).json({
        error: true,
        payload: error
        })
    }
}

//Update an Agency
async function updateAgency(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        const updatedData = req.body;

        delete updatedData.agencyCode

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can update details of an Agency."});
        }

        const result = await agencyService.updateAgency(id, updatedData);

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
        console.log("Error Deleting Agency Controller: ", error);
        return res.status(500).json({
        error: true,
        payload: error
        })   
    }
}
module.exports = {
    createAgency,
    getAllAgencies,
    getAgencyById,
    deleteAgency,
    updateAgency
} 