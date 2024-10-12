const express = require('express');
const { userRegister, userLogin, getUserInfo, addRandomPoints, getUserProfile, getAllUsers, logout } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middleware/auth');


const userRouter = express.Router();

userRouter.route('/register').post(userRegister);
userRouter.route('/login').post(userLogin);
userRouter.route('/profile').get(getUserProfile);
userRouter.route('/users').get(getAllUsers);
userRouter.route('/logout').get(logout)
userRouter.route('/:id').get(getUserInfo);



module.exports = userRouter