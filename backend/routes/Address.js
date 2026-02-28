const express = require('express');
const OptionalAuth = require('../middleware/OptionalAuth');
const { getAddress, AddAddress, deleteAddress, updateAddress, setDefaultAddress } = require('../controller/AddressController');

const address = express.Router()

address.get('/address',OptionalAuth,getAddress);
address.post('/add-address',OptionalAuth,AddAddress)
address.put('/set-default',OptionalAuth,setDefaultAddress)
address.put('/update-address',OptionalAuth,updateAddress)
address.delete('/delete-address',OptionalAuth,deleteAddress)

module.exports = address;