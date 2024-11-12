const e = require('express');
const cashierService = require('../service/cashier.service');
const customerService = require('../service/customer.service');

//Get Cashier List
async function getCashierList(req, res) {
    try {
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await cashierService.getCashierList();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Cashier List Matrices
async function getCashierListMatrices(req, res) {
    try {
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await cashierService.getCashierListMatrices();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 

    } catch (error) {
        console.log("Error Getting CashierList Matrices Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Customer With Tests And Packages
async function getCustomerWithTestsAndPackages(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can View Customer Tests." });
        }

        //Get Customer Details
        const resultCustomer = await customerService.getCustomerBioData(customerId, admissionId);
        
        if(resultCustomer.error) {
            return res.status(resultCustomer.status).json ({
                error: true,
                payload: resultCustomer.payload
            })
        }

        //Get Customer Tests
        const resultTests = await cashierService.getCustomerTestsAndPackages(customerId, admissionId);

        if(resultTests.error) {
            return res.status(resultTests.status).json ({
                error: true,
                payload: resultTests.payload
            })
        }

        const result = {
            status: 200,
            payload: {
                //bio data
                customer: resultCustomer?.payload,
                agency: resultCustomer?.payload?.agency,
                commission: resultCustomer?.payload?.commission, 
                totalAmount: resultCustomer?.payload?.commission + resultTests?.payload?.total,

                //tests
                tests: resultTests?.payload?.selectedTests,
            }
        }

        return res.status(result.status).json ({
            error: false,
            payload: result.payload
        })
                  
    } catch (error) {
        console.log("Error Getting Customer With Tests And Packages Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Add Customer Payment
async function addCustomerPayment(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const paymentData = req.body;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers Can View Customer Tests." });
        }
        
        const result = await cashierService.addCustomerPayment(customerId, admissionId, paymentData);

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
        console.log("Error Creating Customer Payments Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}



module.exports = {
    getCashierList,
    getCashierListMatrices,
    getCustomerWithTestsAndPackages,
    addCustomerPayment
}   