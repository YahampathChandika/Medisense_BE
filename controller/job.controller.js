const jobService = require("../service/job.service");

//Create New Job
async function createJob(req, res) {
    try{
        const userRole_id = req.user.roleId;
        const job = req.body;
        job.userId = req.user.id;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create jobs."});
    }

    const result = await jobService.createJob(job);

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
        console.log("Error creating job controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get All Jobs
async function getAllJobs(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view jobs."});
        }

        const result = await jobService.getAllJobs();

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
        console.log("Error getting all Jobs controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })      
    }
}
module.exports = {
    createJob,
    getAllJobs
}