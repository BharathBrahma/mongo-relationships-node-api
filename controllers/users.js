const mongoose = require('mongoose');
const UserModel = require('../models/user');
const AddressModel = require('../models/address');

module.exports = { 

    index_async: async (req, res, next) => {
        try {
            const users = await UserModel.find({});
            res.status(200).json({
                users
            });
        } catch (err) {
            next(err);
        }
    },

    create_user_async: async (req, res, next) => {
        try {
            console.log('create_user_async');
            console.log('req.body:', req.body);
            const new_user = new UserModel(req.body);
            const user = await new_user.save();
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

      getUser: async (req, res, next) => {
          console.log('getUser');
          try {
              const {
                  userId
              } = req.params;
              const user = await UserModel.findById(userId).populate('addresses');
              console.log(user.addresses[1].street)
              res.status(200).json({
                  user
              });
          } catch (err) {
              next(err);
          }
      } ,
      // enforce that every field is provided
      replaceUser: async (req, res, next) => {
              try {
                  const {
                      userId
                  } = req.params;
                  const newUser = req.body;
                  console.log('userId is', userId);
                  console.log('newUser is', newUser);
                  const result = await UserModel.findByIdAndUpdate(userId, newUser);
                  console.log('result is', result);
                  res.status(200).json({
                      success: true
                  });
              } catch (err) {
                  next(err);
              }
          },

          // any combination of fields
          updateUser: async (req, res, next) => {
              try {
                  const {
                      userId
                  } = req.params;
                  const newUser = req.body;
                  console.log('updateUser userId is', userId);
                  console.log('updateUser newUser is', newUser);
                  const result = await UserModel.findByIdAndUpdate(userId, newUser);
                  console.log('updateUser result is', result);
                  res.status(200).json(result);
              } catch (err) {
                  next(err);
              }
          },


};