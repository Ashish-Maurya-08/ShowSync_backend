const express=require('express');
const router=express.Router();
const listController=require('../controllers/listController');

router.get('/',listController.getLists);
router.post('/add',listController.addToList);
router.post('/remove',listController.removeFromList);
router.post('/update',listController.updateList);

module.exports=router;