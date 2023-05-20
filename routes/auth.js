const express=require("express");
const router=express.Router();
const authControl=require("../controllers/authController")


router.get('/', (req, res) => {
  res.send('Authenticating user')
})

router.get('/all',authControl.getAllUsers)

router.post('/register',authControl.registerUser)

router.post('/login',authControl.loginUser)

router.post('/verify',authControl.verifyUser)

module.exports = router