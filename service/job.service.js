const{Jobs, Users} = require("../models");

//Create New Job
async function createJob(job) {
    try{
        const jobExist = await Jobs.findOne({
            where: {
                job: job.job
            }
        });

        if(jobExist) {
            return{
                error: true,
                status: 409,
                payload: "Sorry already the job is saved."
            }
        }
        const newJob = await Jobs.create(job);

        return {
            error: false,
            status: 200,
            payload: "Job successfully created!"
        };
    } catch(error) {
        console.error('Error creating Job service :' , error);
        throw error;
    }
}

//Get All Jobs
async function getAllJobs() {
    try {
        const job = await Jobs.findAll();
       
        if(!job) {
            return {
                error: true,
                status: 404,
                payload: "No job data available!"
            }
        } else {
            return {
                error: false,
                status: 200,
                payload: job
            }
        }    
    } catch (error) {
        console.error('Error getting Job service :' ,error);
        throw error;       
    }
}


module.exports = {
    createJob,
    getAllJobs
}
 