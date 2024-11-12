const ageCalculator = require('age-calculator');
const {AgeFromDateString, AgeFromDate} = require('age-calculator');
const {Customers, Admissions, CustomerPackages, Packages, Tests, CustomerTests, Agencies, Jobs, Countries, DropdownData} = require("../models");
const { where } = require('sequelize');
const { Sequelize, Op, fn } = require("sequelize");


//Register Customer
async function registerCustomer(customer) {
    try {
        const newCustomer = await Customers.create(customer);

        const admissionDetails = {
            customerId: newCustomer.id,
            medicalType: customer.medicalType
        }

        const newAdmission = await Admissions.create(admissionDetails);

        newCustomer.admissionId = newAdmission.id

        return {
            error: false,
            status: 200,
            payload: newCustomer
        }
    
    } catch (error) {
        console.error('Error Creating Customer Service : ',error);
        if(error.name === "SequelizeForeignKeyConstraintError") {
            return {
                status: 409, // Bad Request status for duplicate email
                payload: "Conflict due to foreign key constraint.",
                error: true,
            }
        }
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Create Customer Packages
async function createCustomerPackages(packages, customerId, admissionId) {
    try {

        const customer = await Customers.findByPk(customerId);
        if(!customer) {
            return {
                error: true,
                status: 404,
                payload: "Customer not found."
            }
        }

        const admission = await Admissions.findByPk(admissionId);
        if(!admission) {
            return {
                error: true,
                status: 404,
                payload: "Admission not found."
            }
        }

        const packageList = packages.map((package, index) => {
            return {
                packageId: package,
                customerId: customerId,
                admissionId: admissionId
            }
        });

        const customerPackages = await CustomerPackages.bulkCreate(packageList);

        return {
            error: false,
            status: 200,
            payload: customerPackages
        }
    
    } catch (error) {
        console.error('Error Creating Customer Packages Service : ',error);
        if(error.name === "SequelizeForeignKeyConstraintError") {
            return {
                status: 409, // Conflict status code due to a conflict with the current state of the resource
                payload: "Conflict due to foreign key constraint.",
                error: true,
            }
        }
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Create Customer Tests
async function createCustomerTests(tests, customerId, admissionId) {
    try {
        if(tests == null) {
            tests = []
        }
        
        let testList1 = tests.map((test, index) => {
            console.log(test, customerId, admissionId)
            return {
                testId: test,
                customerId: customerId,
                admissionId: admissionId,
                packageId: null
            }
        });

        const packageTests = await CustomerPackages.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId
            }, 
            include: {
                model: Packages,
                as: 'package',
                include: {
                    model: Tests,
                    through: "PackageTests"
                }
            }
        })

        if(!packageTests) {

            const customerTests = await CustomerTests.bulkCreate(testList1);
            return {
                error: false,
                status: 200,
                payload: customerTests
            }
        }
        else {
            for(let i = 0; i < packageTests.length; i++) {
                const package = packageTests[i].package;
                const tempList = package.Tests.map((test, index) => {
                    return {
                        testId: test.id,
                        customerId: customerId,
                        admissionId: admissionId,
                        packageId: package.id
                    }
                })
                testList1 = testList1.concat(tempList)
    
            }
    
            const customerTests = await CustomerTests.bulkCreate(testList1);

            const cusTestsWithTestDetails = await CustomerTests.findAll({
                where: {
                    customerId: customerId,
                    admissionId: admissionId
                },
                include: {
                    model: Tests,
                    as: 'test'
                }
            })
            var x = []
            const typeList = cusTestsWithTestDetails.map((cusTest, index) => {
                x.push(cusTest.test.type)
                return 0
            })

            console.log("List:---", x);

            if(x.includes('type A')) {
                await Admissions.update({miniLabStatusId:9}, {
                    where: {
                        id: admissionId
                    }
                })
            } 

            if(x.includes('type D')) {
                await Admissions.update({xRayStatusId:17}, {
                    where: {
                        id: admissionId
                    }
                })
            } 
    
            return {
                error: false,
                status: 200,
                payload: customerTests
            }
        }
        
    
    } catch (error) {
        console.error('Error Creating Customer Test Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get All Customers
async function getAllCustomers() {
    try {
        const customers = await Customers.findAll({
            include: [{
                model: Admissions,
                as: 'admissions'
            }, {
                model: Agencies,
                as: 'agency'
            }, {
                model: Countries,
                as: 'country'
            }, {
                model: Jobs,
                as: 'job'
            }]
        });

        if(!customers) {
            return {
                error: true,
                status: 404,
                payload: "No Customers Found!"
            }
        } 

        const customerList = customers.map((customer, index) => {
            
            //Convert global time to local time.
            const off = customer.updatedAt.getTimezoneOffset() * 60000
            var newdt = new Date(customer.updatedAt - off).toISOString()
            const dateAndTime = newdt.split('T')
            const datePart = dateAndTime[0];
            const timePart = dateAndTime[1].substring(0, 8);

            return {
                customerId: customer.id,
                admissionId: customer?.admissions[0]?.id,
                image: customer.image,
                fullName: customer.fullName,
                dateOfBirth: customer.dateOfBirth,
                sex: customer.sex,
                address: customer.address,
                email: customer.email,
                mobileNo: customer.mobileNo,
                civilStatus: customer.civilStatus,
                nic: customer.nic,
                country: customer?.country?.name || null,
                agency: customer?.agency?.name || null,
                job: customer?.job?.job || null,
                date: datePart,
                time: timePart,
                medical: customer.admissions[0]?.medicalType || null,
                status: customer.admissions[0]?.paymentStatus || null
            }
        })

        return{
            error: false,
            status: 200,
            payload: customerList
        }

        
    } catch (error) {
        console.error('Error Getting Customer Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Customer By ID
async function getCustomerById(id) {
    try {
        const customer = await Customers.findOne({
            where: {
                id: id
            },
            include: [{
                model: Admissions,
                as: 'admissions',
            }, {
                model: Agencies,
                as: 'agency'
            }, {
                model: Countries,
                as: 'country'
            }, {
                model: Jobs,
                as: 'job'
            }]
        });

        if(!customer) {
            return {
                error: true,
                status: 404,
                payload: "No Customer Found!"
            }
        }

        const customersObj = {
            id: customer.id,
            image: customer?.image || null,
            fullName: customer?.fullName,
            dateOfBirth: customer?.dateOfBirth,
            sex: customer.sex,
            address: customer.address,
            email: customer.email,
            mobileNo: customer.mobileNo,
            civilStatus: customer.civilStatus,
            nic: customer.nic,
            passportId: customer?.passportId,
            issuedDate: customer?.issuedDate,
            issuedPlace: customer?.issuedPlace,
            timeOfLastMeal: customer?.timeOfLastMeal,
            referredBy: customer?.referredBy,
            country: customer?.country?.name || null,
            agency: customer?.agency?.name || null,
            job: customer?.job?.job || null,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
            medicalType: customer?.admissions[0]?.medicalType || null
        }

        return {
            error: false,
            status: 200,
            payload: customersObj
        }

    } catch (error) {
        console.error('Error Getting Customer By Id Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Update Customer By ID
async function updateCustomerById(id, data) {
    try {
        const customer = await Customers.findByPk(id);     

        if(!customer) {
            return {
                error: true,
                status: 404,
                payload: "No Customer Found!"
            }
        }

        const updatedCustomer = await customer.update(data);
        return {
            error: false,
            status: 200,
            payload: "Customer Successfully Updated!"
        }
    } catch (error) {
        console.error('Error Updating Customer By Id Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Delete Customer By Id
async function deleteCustomerById(id) {
    try {
        const customer = await Customers.findByPk(id);
        if(!customer) {
            return {
                error: true,
                status: 404,
                payload: "No Customer Found!"
            }
        }

        await customer.destroy();
        return {
            error: false,
            status: 200,
            payload: "Customer Successfully Deleted!"
        }

    } catch (error) {
        console.error('Error Deleting Customer By Id Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Customer Bio Data By ID
async function getCustomerBioData(customerId, admissionId) {
    try {
        const customer = await Customers.findOne({
            where: {
                id: customerId
            },
            include: [{
                model: Agencies,
                as: 'agency',
                attributes: ['name', 'commision']
            }, {
                model: Countries,
                as: 'country',
                attributes: ['name']
            }, {
                model: Jobs,
                as: 'job',
                attributes: ['job']
            }, {
                model: Admissions,
                as: 'admissions',
                where: {
                    id: admissionId
                }
            }]
        })

        if(!customer) {
            return {
                error: true,
                status: 404,
                payload: "No Customer Found"
            }
        }
        //calculate age
        let customerAge = new AgeFromDateString(customer.dateOfBirth).age;
        admissionId = parseInt(admissionId);

        const customerObj = {
            customerId: customer.id,
            admissionId: admissionId,
            image: customer?.image || null,
            fullName: customer?.fullName,
            age: customerAge,
            gender: customer?.sex,
            country: customer?.country?.name || null,
            agency: customer?.agency?.name || null,
            commission: customer?.agency?.commision || null,
            job: customer?.job?.job || null,
            medicalType: customer?.admissions[0]?.medicalType,
            nic: customer?.nic,
            passport: customer?.passportId,
            
        }

        return {
            error: false,
            status: 200,
            payload: customerObj
        }

    } catch (error) {
        console.error('Error Getting Customer Bio Data Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

async function getCustomerMatrices() {
    try {
        const Op = Sequelize.Op;
        const START = new Date();
        START.setHours(0, 0, 0, 0);
        const NOW = new Date();

        const totalAmount = await Admissions.findAll({
            where: {
                paymentStatus: 'Paid',
                // medicalType: 'nonGCC'
            },
            attributes: [
              'medicalType',
              [Sequelize.fn('sum', Sequelize.col('amountToPay')), 'totalAmount'],
              [Sequelize.fn('count', Sequelize.col('medicalType')), 'count']
            ],
            group: ['medicalType'],
            raw: true
        });

        const income = await Admissions.sum('amountToPay', {
            where: {
                paymentStatus: 'Paid'
            }
        })

        var response = totalAmount.map((medical, index) => {
            const medi = medical.medicalType 
            return {
                [medi]: {
                    count: medical.count,
                    totalAmount: medical.totalAmount
                }

            }
        })

        response.income = income


        console.log(Object.keys(response))

        return {
            error: false,
            status: 200,
            payload: response
        }

    } catch (error) {
        console.error('Error Getting Customer Matrices Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get customer status from dept.
async function getCustomerAdmissionData(customerId, admissionId){
    try {
        const admissionData = await Admissions.findByPk(admissionId, {
            include: [{
                model: DropdownData,
                as: "miniLabStatus"
            }, {
                model: DropdownData,
                as: "labStatus"
            }, {
                model: DropdownData,
                as: "xRayStatus"
            }]
        })


        //Get Customer test reults
        const testResults = await CustomerTests.findAll({
            where: {
                admissionId: admissionId,

            },
            include: {
                model: Tests,
                as: 'test'
            }
        })

        const testResultsList = testResults.map((test, index) => {
            return {
                testId: test.test.id,
                testCode: test?.test.testCode,
                description: test?.test.description,
                result: test?.result,
                unit: test?.unit,
                status: test?.status
            }
        })

        if(!admissionData) {
            return {
                error: true,
                status: 404,
                payload: "No Admission Found"
            }
        }

        const customerObj = {
            customerId: admissionData.id,
            admissionId: admissionId,
            medicalType: admissionData?.medicalType || null,
            miniLabStatus: admissionData.miniLabStatus.label,
            xRayStatus: admissionData.xRayStatus.label,
            labStatus: admissionData?.labStatus?.label || null
            
        }
        return {
            error: false,
            status: 200,
            payload: {
                admission: customerObj,
                testResults: testResultsList
            }
        }
    } catch (error) {
        console.error('Error Getting Customer Matrices Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    registerCustomer,
    createCustomerPackages,
    createCustomerTests,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
    getCustomerBioData,
    getCustomerMatrices,
    getCustomerAdmissionData
}