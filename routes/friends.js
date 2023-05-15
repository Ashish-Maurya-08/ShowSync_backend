const express=require('express');
const router=express.Router();
const friendsController=require('../controllers/friendsController');

router.get('/',friendsController.getFriends);
router.post('/add',friendsController.addFriend);
router.post('/remove',friendsController.removeFriend);

module.exports=router;
