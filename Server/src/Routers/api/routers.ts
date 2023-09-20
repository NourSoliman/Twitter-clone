import express  from 'express'
const router = express.Router();
const usersController = require(`../../Controllers/userControllers`)
import auth from '../../MiddleWares/auth'
require("dotenv").config();
router.get(`/register`, (req , res) => {
    res.send(`yea its register route`)
})
//LOGIN
router.post(`/register`, usersController.register)
router.post(`/login`,usersController.login)
router.get(`/allusers/:page`,usersController.getAllUsers)
module.exports = router;
