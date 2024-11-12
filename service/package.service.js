const { PackageTests, Packages, Tests} = require("../models");

//Create Package
async function createPackage(package) {
    try {
        const newPackage = await Packages.create(package);

        return {
            error: false,
            status: 200,
            payload: newPackage
        }
    } catch (error) {
        console.error('Error Creating Package Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Create Package Tests
async function createPackageTests(tests, packageId) {
    try {
        const package = await Packages.findByPk(packageId);
        if(!package) {
            return {
                error: true,
                status: 404,
                payload: "Sorry No Package Found!"
            }
        }

        const testList = tests.map((test, index) => {
            return {
                pkgId: packageId,
                testId: test
            }

        })

        const packageTests = await PackageTests.bulkCreate(testList);

        return {
            error: false,
            status: 200,
            payload: "Package Successfully Created!"
        }
        
    } catch (error) {
        console.error('Error Creating Package Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get All Packages
async function getAllPackages() {
    try {
        const packages = await Packages.findAll({
            include: {
                model: Tests,
                through: "PackageTests",
                attributes: ['id', 'testCode', 'description', 'type', 'price']
            }
        });

        if(!packages) {
            return {
                error: true,
                status: 404,
                payload: "No Packages Found!"
            }
        }

        else {
            return {
                error: false,
                status: 200,
                payload: packages
            }
        }
        
    } catch (error) {
        console.error('Error Creating Package Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Delete Package
async function deletePackage(id) {
    try {
        const package = await Packages.findByPk(id);

        if(!package) {
            return {
                error: true,
                status: 404,
                payload: "No Package Found!"
            }
        }

        const deletePkg = await Packages.destroy({
            where: {
                id: id
            }
        });

        return {
            error: false,
            status: 200,
            payload: "Package Successfully Deleted!"
        }

    } catch (error) {
        console.error('Error Deleting Package Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Package By Id
async function getPackageById(id) {
    try {
        const package = await Packages.findByPk(id, {
            include: {
                model: Tests,
                through: "PackageTests",
                attributes: ['id', 'testCode', 'description', 'type', 'price']
            }
        });

        if(!package) {
            return {
                error: true,
                status: 404,
                payload: "No Package Found!"
            }
        }
        else {
            return {
                error: false,
                status: 200,
                payload: package
            }
        }

        

    } catch (error) {
        console.error('Error Deleting Package Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    createPackage,
    createPackageTests,
    getAllPackages,
    deletePackage,
    getPackageById
}