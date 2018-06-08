const UserModel = require('../models/user');
const AddressModel = require('../models/address');

module.exports = {

    index: async (req, res, next) => {
            const address = await AddressModel.find({});
            res.status(200).json({
                address
            });
        },

    addAddress: async (req, res, next) => {
        console.log("Address body : ", req.body);
        // 1. Find the the actual seller
        const owner = await UserModel.findById(req.body.owner);
        console.log("Found owner : ", owner);
        // 2. Create a new car
        const newAddress = req.body;
        delete newAddress.owner;
        const address = new AddressModel(newAddress);
        console.log("Created Address : ", address);
        await address.save();
        console.log(owner.addresses)
        owner.addresses.push(address);
        await owner.save();
        res.status(200).json({
            address
        });
    }

};