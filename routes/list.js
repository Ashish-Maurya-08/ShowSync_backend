const express=require('express');
const router=express.Router();
const listController=require('../controllers/listController');
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

router.get('/',listController.getLists);
router.post('/add',listController.addToList);
router.post('/remove',listController.removeFromList);
router.post('/update',listController.updateList);

module.exports=router;