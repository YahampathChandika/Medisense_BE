const { Sequelize, Op, where } = require("sequelize");
const {Admissions, Customers, CustomerTests, Tests, Packages, CustomerPackages} = require("../models");

//Get Patient List For Mini Lab 
async function getCustomerList() {
    try {
        const customerList = await Admissions.findAll({
            where: {
                miniLabStatusId: 8
            },
            attributes: ['id', "medicalType", "updatedAt"],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id', 'image', 'fullName', 'mobileNo']
            }]
        });

        if (!customerList) {
            return {
                error: true,
                status: 404,
                payload: "No patients are registered for miniLab tests."
            }
        }

        const modifiedCustomerList = customerList.map(admission => {

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
            payload: modifiedCustomerList
        }
    } catch (error) {
        console.error('Error Getting Customer List Lab Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

async function addTestResults(data, customerId, admissionId) {
    try {
        await CustomerTests.bulkCreate(data.testResults, {
            updateOnDuplicate: ["result", "status", "unit"]
        })

        await Admissions.update({labStatusId: data.labStatusId}, {
            where: {
                id: admissionId
            }
        })

        return {
            error: false,
            status: 200,
            payload: "Tests Updated Successfully"
        }
    } catch (error) {
        console.error('Error Adding Test Results Lab Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getCustomerList,
    addTestResults
}