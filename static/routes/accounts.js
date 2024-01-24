const express = require('express');

// {  } -> destructure
const {
    getAccounts, getAccount,
    createAccount, updateAccount,
    deleteAccount, verifyAccount
    } = require('../controllers/accounts');



const router = express.Router();

// same as writing everything on one line
router
.route('/')
.get(getAccounts)

//.post(createAccount);

router
.route('/:id')
//.get(getAccount)
.put(updateAccount)
.delete(deleteAccount);

router
.route('/auth')
//.post(createAccount)
//.get(verifyAccount)
//.post(verifyAccount)

module.exports = router;