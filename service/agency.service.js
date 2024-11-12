const {Agencies, Users} = require("../models");

//Create New Agency
async function createAgency(agency) {
    try {
        const agencyExist = await Agencies.findOne({
            where: {
                name: agency.name
            }
        });

        if(agencyExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry already the agency is saved."
            }
        } 
        const newAgency = await Agencies.create(agency);

        return {
            error: false,
            status: 200,
            payload: "Agency successfully created!"
        };
    
    } catch(error) {
        console.error('Error creatng Agency service :' , error);
        throw error;
    }
}

//Get All agencies
async function getAllAgencies() {
    try {
        const agency = await Agencies.findAll({
            include: {
                model: Users,
                as: "user",
                attributes: ["username"]
            }

        });

        if(!agency) {
            return {
                error: true,
                status: 404,
                payload: "No agency data Available!"
            }
        }

        else {
            return {
                error: false,
                status: 200,
                payload: agency
            }
        }
        
    } catch (error) {
        console.error('Error getting Agency service :' ,error);
        throw error;   
    }
}

//Get Agency By Id
async function getAgencyById(id) {
    try {
        const agency = await Agencies.findOne({
            where: {
                id: id
            },
            include: {
                model: Users,
                as: "user",
                attributes: ["username"]
            }

        });

        if(!agency) {
            return {
                error: true,
                status: 404,
                payload: "No agency date Available!"
            }
        }

        else {
            return {
                error: false,
                status: 200,
                payload: agency
            }
        }
        
    } catch (error) {
        console.error('Error getting Agency by ID service :' ,error);
        throw error;   
    }
}

//Delete an Agency
async function deleteAgency(id) {
    try {
        const agency = await Agencies.findByPk(id);

        if(!agency) {
            return {
                error: true,
                status: 404,
                payload: "Agency not found!"
            }
        } else {
            const deleteAgency = await Agencies.destroy ({
                where: {
                    id: id
                }
            })

            return {
                error: false,
                status: 200,
                payload: "Agency successfully deleted!"
            }
        }
        
    } catch (error) {
        console.error('Error deleteing Agency service: ' ,error);
        throw error;
    }
}

//Update Agency
async function updateAgency(id, updatedData) {
    try {
         const agency = await Agencies.findByPk(id);

         if(!agency) {
            return {
                error: true,
                status: 404,
                payload: "Agency not found!"
            }
        } 
        else {
            const updatedAgency = await agency.update(updatedData);

            return {
                error: false, 
                status: 200,
                payload: "Agency updated successfully!"
            }
        }
    } catch (error) {
        console.error('Error Updating Agency Service : ',error);
        throw error;  
    }
}


module.exports = {
    createAgency,
    getAllAgencies,
    getAgencyById,
    deleteAgency,
    updateAgency
    
}