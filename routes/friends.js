const express=require('express');
const router=express.Router();
const friendsController=require('../controllers/friendsController');
const jwtVerify=require('../jwtVerify')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    const bearer=req.headers.authorization; 
    if(bearer){
      const token=bearer.split(" ")[1];
      if(jwtVerify(token)){
        return next()
      }
    }
    res.send("Not Authorized")
})

router.get('/',friendsController.getFriends);
router.post('/add',friendsController.addFriend);
router.post('/remove',friendsController.removeFriend);

module.exports=router;
