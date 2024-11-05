import { adminLogin , getAllUsers ,updateUser , editPage , deleteUser , createUser} from '../controllers/adminController.js';
import {verifyAdminToken} from '../utils/verifyAdmin.js'


import express  from 'express'

const router = express.Router();

router.post('/admin/login' ,adminLogin)
router.get('/users', verifyAdminToken, getAllUsers);
router.get('/admin/edit/:id' , verifyAdminToken , editPage)
router.put('/update/:id', verifyAdminToken, updateUser);
router.delete('/delete/:id' , verifyAdminToken , deleteUser)
router.post ('/createuser' , verifyAdminToken , createUser)

export default router;


