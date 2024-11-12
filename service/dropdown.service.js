const { where } = require("sequelize");
const { Dropdowns, DropdownData } = require("../models");

//Get Cashier Payment Methods Dropdown
async function getPaymentMethods(req, res) {
    try {
        const paymentMethods = await Dropdowns.findOne({
            where: {
                label: 'paymentMethods'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        });

        if(!paymentMethods) {
            return {
                error: true,
                status: 404,
                payload: "No Payment Methods Found!"
            }
        }

        const dropdown = paymentMethods.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Payment Methods Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}

//Get Bank Dropdown
async function getBanks(req, res) {
    try {
        const banks = await Dropdowns.findOne({
            where: {
                label: 'banks'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        });

        if(!banks) {
            return {
                error: true,
                status: 404,
                payload: "No Banks Found!"
            }
        }

        const dropdown = banks.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Banks Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}

//Get Credit Approvers Dropdown
async function getCreditApprovers(req, res) {
    try {
        const creditApprovers = await Dropdowns.findOne({
            where: {
                label: 'creditApprovers'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        }); 
        console.log("Hello");
        if(!creditApprovers) {
            return {
                error: true,
                status: 404,
                payload: "No Credit Approvers Found!"
            }
        }

        const dropdown = creditApprovers.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Credit Approvers Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}

//Get Mini Lab Status Dropdown
async function getMiniLabStatus(req, res) {
    try {
        const miniLabStatus = await Dropdowns.findOne({
            where: {
                label: 'miniLabStatus'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        }); 
       
        if(!miniLabStatus) {
            return {
                error: true,
                status: 404,
                payload: "No Mini Lab Status Found!"
            }
        }

        const dropdown = miniLabStatus.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Mini Lab Status Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}


//Get Lab Status Dropdown
async function getLabStatus(req, res) {
    try {
        const labStatus = await Dropdowns.findOne({
            where: {
                label: 'labStatus'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        }); 
       
        if(!labStatus) {
            return {
                error: true,
                status: 404,
                payload: "No Lab Status Found!"
            }
        }

        const dropdown = labStatus.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting Lab Status Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}

//Get X-Ray Status Dropdown
async function getXRayStatus(req, res) {
    try {
        const xRayStatus = await Dropdowns.findOne({
            where: {
                label: 'xRayStatus'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        }); 
       
        if(!xRayStatus) {
            return {
                error: true,
                status: 404,
                payload: "No X-Ray Status Found!"
            }
        }

        const dropdown = xRayStatus.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting X-Ray Status Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
    }
}

//Get Radiographers Dropdown
async function getRadiographers(req, res) {
    try {
        const radiographers = await Dropdowns.findOne({
            where: {
                label: 'radiographers'
            },
            include: [{
                model: DropdownData,
                as: 'dropdownData'
            }]
        }); 
       
        if(!radiographers) {
            return {
                error: true,
                status: 404,
                payload: "No radiographers Found!"
            }
        }

        const dropdown = radiographers.dropdownData.map(data => {
            return {
                id: data.id,
                label: data.label,
            }
        })

        return {
            error: false,
            status: 200,
            payload: dropdown
        }
    } catch (error) {
        console.error('Error Getting radiographers Dropdown Service : ',error);
        return {
            error: true, 
            status: 500,
            payload: error
        }
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