const countryService = require("../service/country.service");

//Create New Country
async function createCountry(req, res) {
    try{
        const userRole_id = req.user.roleId;
        const country = req.body;
        country.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create countries."});
    }

    const result = await countryService.createCountry(country);

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
        console.log("Error creating Country controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    } 
}

   

//Get All Countries
async function getAllCountries(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view countries."});
        }

        const result = await countryService.getAllCountries();

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
        console.log("Error getting all Countries controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })      
    }
}

//Get gcc Countries
async function getGccCountries(req, res) {
    try{
    const userRole_id = req.user.roleId;

    if (![1].includes(userRole_id)) {
        return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view the gcc countries."});
    }

    const result = await countryService.getGccCountries();

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
    }catch(error) {
    console.log("Error creating GCC Country controller: ", error);
    return res.status(500).json({
        error: true,
        payload: error
         })

    }
}

//Get Non-GCC Countries
async function getNonGccCountries(req, res) {
    try{
    const userRole_id = req.user.roleId;

    if (![1].includes(userRole_id)) {
        return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view the Non-GCC countries."});
    }

    const result = await countryService.getNonGccCountries();

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
    }catch(error) {
    console.log("Error creating Non-GCC Country controller: ", error);
    return res.status(500).json({
        error: true,
        payload: error
         })
    }
}

module.exports = {
    createCountry,
    getAllCountries,
    getGccCountries,
    getNonGccCountries
} 