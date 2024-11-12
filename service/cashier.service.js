const { Sequelize, Op } = require("sequelize");
const {Admissions, Customers, CustomerTests, Tests, Packages, CustomerPackages} = require("../models");

//Get Cashier List
async function getCashierList() {
    try {
        const cashierList = await Admissions.findAll({
            where: {
                paymentStatus: 'Not Paid'
            },
            attributes: ['id', "medicalType", "updatedAt"],
            include : [{
                model: Customers,
                as: 'customer',
                attributes: ['id', 'image', 'fullName', 'mobileNo']
            }]
        });

        const modifiedCashierList = cashierList.map(admission => {

            //Convert global time to local time.
            const off = admission.updatedAt.getTimezoneOffset() * 60000
            var newdt = new Date(admission.updatedAt - off).toISOString()
            const dateAndTime = newdt.split('T')
            const datePart = dateAndTime[0];
            const timePart = dateAndTime[1].substring(0, 8);
            
            return {
                customerId: admission.customer.id,
                admissionId: admission.id,
                image: admission.customer.image,
                fullName: admission.customer.fullName,
                medicalType: admission.medicalType,
                contactNo: admission.customer.mobileNo,
                time: timePart
            }
        })

        return {
            error: false,
            status: 200,
            payload: modifiedCashierList
        }
    } catch (error) {
        console.error('Error Getting Cashier List Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Cashier List Matrices
async function getCashierListMatrices() {
    try {

        const Op = Sequelize.Op;
        const START = new Date();
        START.setHours(0, 0, 0, 0);
        const NOW = new Date();


        const customersWaiting = await Admissions.count({
            where: {
                paymentStatus: 'Not Paid'
            }
        })

        const customersPaid = await Admissions.count({
            where: {
                paymentStatus: 'Paid',
                updatedAt: {
                    [Op.between]: [START, NOW]
                }
            }
        })

        const todaysIncome = await Admissions.sum('amountToPay', {
            where: {
                paymentStatus: 'Paid',
                updatedAt: {
                    [Op.between]: [START, NOW]
                }
            }
        })

        const matrices = {
            customersWaiting: customersWaiting,
            customersPaid: customersPaid,
            todaysIncome: todaysIncome || 0
        }

        return {
            error: false,
            status: 200,
            payload: matrices
        }

    } catch (error) {
        console.error('Error Getting Cashier List Matrices Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Get Customer With Tests And Packages
async function getCustomerTestsAndPackages(customerId, admissionId) {
    try {
        console.log("HELLO1ghgfjhgjgjhg")
        const customerTests = await CustomerTests.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId,
                packageId: {
                    [Op.eq]: null
                }
            },
            attributes: ['id','packageId', 'testId'],
            include: [{
                model: Tests,
                as: 'test',
                attributes: ['id','testCode', 'description', 'price']
            }]
        });
        console.log("Customer Tests: ", customerTests)

        const cutomerPackages = await CustomerPackages.findAll({
            where: {
                customerId: customerId,
                admissionId: admissionId,
            },
            attributes: ['id','packageId'],
            include: [{
                model: Packages,
                as: 'package',
                attributes: ['id','packageCode', 'discription', 'price'],
            }]

        });
        
        var customerWithTestsAndPackages = [];

        if(cutomerPackages) {
            const cutomerPackageTestsModified = cutomerPackages.map(customerPackage => {
                return {
                    id: customerPackage.package.id,
                    code: customerPackage.package.packageCode,
                    description: customerPackage.package.discription,
                    price: customerPackage.package.price
                }
            });

            customerWithTestsAndPackages = customerWithTestsAndPackages.concat(cutomerPackageTestsModified);
        }

        console.log("Customer Packages: ", customerWithTestsAndPackages)

        if(customerTests) {
            const customerTestsModified = customerTests.map(customerTest => {
                return {
                    id: customerTest.test.id,
                    code: customerTest.test.testCode,
                    description: customerTest.test.description,
                    price: customerTest.test.price
                }
            });

            customerWithTestsAndPackages = customerWithTestsAndPackages.concat(customerTestsModified);
        }
        var total = 0
        
        //calculate the total price of selected Tests
        const price = customerWithTestsAndPackages.forEach((testOrPackage) => {
            total += testOrPackage.price;
        })

        const response = {
            selectedTests: customerWithTestsAndPackages,
            total: total
        }

        console.log("response: ", response)

        return {
            error: false,
            status: 200,
            payload: response
        }   

    } catch (error) {
        console.error('Error Getting Customer With Tests and Packages Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

//Add Customer Payment
async function addCustomerPayment(customerId, admissionId, data) {
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

        data.paymentStatus = "Paid"

        const payment = await admission.update(data);

        return {
            error: false,
            status: 200,
            payload: "Payment Added Successfully!"
        }
    } catch (error) {
        console.error('Error Creating Customer Payments Service : ',error);
        return {
            error: true,
            status: 500,
            payload: error
        }
    }
}

module.exports = {
    getCashierList,
    getCashierListMatrices,
    getCustomerTestsAndPackages,
    addCustomerPayment
}