const express=require("express");
const router=express.Router();
const authControl=require("../controllers/authController")

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  })

router.get('/', (req, res) => {
  res.send('Authenticating user')
})

router.post('/register',authControl.registerUser)

router.post('/login',authControl.loginUser)

module.exports = router