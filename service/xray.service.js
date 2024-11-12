const { Sequelize, Op } = require("sequelize");
const {Admissions, Customers, CustomerTests, Tests, Packages, CustomerPackages} = require("../models");

//Get Patient List For X-RAY
async function getXrayList() {
    try {
        const xRayList = await Admissions.findAll({
            where: {
                xRayStatusId: 17
            },
            attributes: ['id', "medicalType", "updatedAt"],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id', 'image', 'fullName', 'mobileNo']
            }]
        });

        if (!xRayList) {
            return {
                error: true,
                status: 404,
                payload: "No patients are registered for miniLab tests."
            }
        }

        const modifiedXRayList = xRayList.map(admission => {

            //Convert global time to local time.
            const off = admission.updatedAt.getTimezoneOffset() * 60000
            var newdt = new Date(admission.updatedAt - off).toISOString()
            const dateAndTime = newdt.split('T')
            const datePart = dateAndTime[0];
            const timePart = dateAndTime[1].substring(0, 8);
            
            return {
                customerId: admission.customer.id,
                admissionId: admission.id,
                image: admission?.customer?.image,
                fullName: admission.customer.fullName,
                medicalType: admission.medicalType,
                contactNo: admission.customer.mobileNo,
                time: timePart
            }
        })

        return {
            error: false,
            status: 200,
            payload: modifiedXRayList
        }
    } catch (error) {
        console.error('Error Getting X-Ray List Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Customer Tests for X-Ray
async function getCustomerTests(customerId, admissionId) {
    try {
        const customerTests = await CustomerTests.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId
            },
            attributes: ['id','packageId', 'testId'],
            include: [{
                model: Tests,
                as: 'test',
                attributes: ['id','testCode', 'description', 'price', 'type', 'unit'],
                where: {
                    type: "type D"
                }
            }]
        });

        if (!customerTests) {
            return {
                error: true,
                status: 404,
                payload: "No tests are registered for this patient."
            }
        }

        const testsList = customerTests.map(test => {
            return {
                id: test?.id,
                packageId: test?.packageId,
                testId: test?.test?.id,
                testCode: test?.test?.testCode,
                description: test?.test?.description,
                type: test?.test?.type,
                unit: test?.test?.unit,
                price: test?.test?.price
            }
        });

        return {
            error: false,
            status: 200,
            payload: testsList
        }

    } catch (error) {
        console.error('Error Getting Customer Tests X Ray Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Update X-Ray Status
async function updateXRayStatus(customerId, admissionId, data) {
    try {
        const admission = await Admissions.findOne({
            where: {
                id: admissionId,
                customerId: customerId
            }
        })

        if(!admission) {
            return {
                error: true,
                status: 404,
                payload: 'Admission Not Found'
            }
        }

        const xRayStatus = await admission.update(data);

        return {
            error: false,
            status: 200,
            payload: "Mini Lab status updated successfully!"
        }
    } catch (error) {
        console.error('Error Updating X-Ray Status Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

async function getXRayMatrices() {
    try {

        const Op = Sequelize.Op;
        const START = new Date();
        START.setHours(0, 0, 0, 0);
        const NOW = new Date();

        const customersWaiting = await Admissions.count({
            where: {
                xRayStatusId: 17
            }
        })

        const customersXRayTaken = await Admissions.count({
            where: {
                miniLabStatusId: {
                    [Op.or]: [13,14,15,16]
                },
                updatedAt: {
                    [Op.between]: [START, NOW]
                }
            }
        })

        const matrices = {
            customersWaiting: customersWaiting,
            customersXRayTaken: customersXRayTaken,
            total: customersWaiting + customersXRayTaken || 0
        }

        return {
            error: false,
            status: 200,
            payload: matrices
        }

    } catch (error) {
        console.error('Error Getting MiniLab List Matrices Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getXrayList,
    updateXRayStatus,
    getCustomerTests,
    getXRayMatrices
}