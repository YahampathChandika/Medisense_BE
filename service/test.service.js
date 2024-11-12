const {Tests, Users} = require("../models");

//Create New Test
async function createTest(test) {
    try {
        const testExist = await Tests.findOne({
            where: {
                description: test.description
            }
        });

        const testCodeExist = await Tests.findOne({
            where: {
                testCode: test.testCode
            }
        });

        if(testExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry a test already saved by that test name!"
            }
        }

        if(testCodeExist) {
            return {
                error: true,
                status: 409,
                payload: "Sorry a test code already saved by that test name!"
            }
        }
        const newTest = await Tests.create(test);

        return {
            error: false,
            status: 200,
            payload: "Test Successfully Created!"
        };

    } catch (error) {
        console.error('Error Creating Test Service : ',error);
        throw error;
    }
}

//Get All Tests
async function getAllTests() {
    try {
        const tests = await Tests.findAll({
            include: {
                model: Users,
                as: "user",
                attributes: ["username"]
            }
        });

        if(!tests) {
            return {
                error: true,
                status: 404,
                payload: "No test data Available!"
            }
        }

        else {
            return {
                error: false,
                status: 200,
                payload: tests
            }
        }

    } catch (error) {
        console.error('Error Getting Test Service : ',error);
        throw error;
    }
}

//Get test by ID
async function getTestById(id) {
    try {
        const test = await Tests.findByPk(id, {
            include: {
                model: Users,
                as: "user",
                attributes: ["username"]
            }
        });

        if(!test) {
            return {
                error: true,
                status: 404,
                payload: "Test not found!"
            }
        }

        else {
            return {
                error: false,
                status: 200,
                payload: test
            }
        }
    } catch (error) {
        console.error('Error Getting Test By ID Service : ',error);
        throw error;
    }
}

//Delete Test
async function deleteTest(id) {
    try {
        const test = await Tests.findByPk(id);

        if(!test) {
            return {
                error: true,
                status: 404,
                payload: "Test not found!"
            }
        }

        else {
            const deleteTest = await Tests.destroy({
                where: {
                    id: id
                }
            })

            return {
                error: false,
                status: 200,
                payload: "Test deleted successfully!"
            }
        }
    } catch (error) {
        console.error('Error Deleting Test Service : ',error);
        throw error;
    }
}

//Update Test
async function updateTest(id, updatedData) {
    try {
        const test = await Tests.findByPk(id);

        if(!test) {
            return {
                error: true,
                status: 404,
                payload: "Test not found!"
            }
        } 
        else {
            const updatedTest = await test.update(updatedData);

            return {
                error: false,
                status: 200,
                payload: "Test updated successfully!"
            }
        }

    } catch (error) {
        console.error('Error Updating Test Service : ',error);
        throw error;
    }
}

module.exports = {
    createTest,
    getAllTests,
    getTestById,
    deleteTest,
    updateTest
}