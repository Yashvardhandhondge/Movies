const {Router} = require('express');
const userRoutes = Router();
const {signin,signup,UpdatePassword,getInfo} = require('../controllers/user.controller');
const {usermiddleware} = require('../middleware/usermiddleware')

userRoutes.post('/signup',signup);

userRoutes.post('/signin',signin);

userRoutes.put('/update-password',usermiddleware,UpdatePassword)

userRoutes.get('/info',usermiddleware,getInfo);
module.exports ={
    userRoutes
}