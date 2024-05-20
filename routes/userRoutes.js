const express = require('express');
const router =express.Router();
const bodyParser =require("body-parser");
const check =require("express-validator").check

const authController=require('../controllers/authController');

router.post(
    '/api/signup',
    bodyParser.urlencoded({extended:true}),
    check('email')
    .not()
    .isEmpty().withMessage('email is required')
    .isEmail(),
    check('password')
    .not()
    .isEmpty().withMessage('password is required')
    .isLength({min:6})
    .withMessage('password must be more than 6 charachters'),
    authController.postSignup
);

router.post(
    '/api/signin',
    bodyParser.urlencoded({extended:true}),
    check('email')
    .not()
    .isEmpty().withMessage('email is required')
    .isEmail(),
    check('password')
    .not()
    .isEmpty().withMessage('password is required')
    .isLength({min:6})
    .withMessage('password must be more than 6 charachters'),
    authController.postSignin
);

router.post('/api/logout', authController.postLogout );
router.get('/api/user/all', authController.getAllprofile );
router.get('/api/user/:id', authController.getByid );
router.put('/api/user/:id', authController.updateProfile );
router.delete('/api/user/:id', authController.deleteProfile );


module.exports=router;
