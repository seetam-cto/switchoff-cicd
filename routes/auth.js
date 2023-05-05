import express from "express"
import { 
    register,
    login,
    changePassword,
    updatePassword,
    confirmPasscode,
    updateUser,
    deactivateUser,
    verifyUser,
    adminLogin,
    getAllUsers,
    adminRegister,
    vendorRegister,
    vendorLogin,
    socialAuth
} from "../controllers/auth"
import { requireSignIn } from "../middlewares"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/login/social', socialAuth)
router.post('/admin/login', adminLogin)

//user interactions
router.post('/user/register',requireSignIn, adminRegister)
router.get('/user/all', getAllUsers)
router.post('/user/update/:id', requireSignIn, updateUser)
router.put('/user/delete/:id', requireSignIn, deactivateUser)

//vendor registration
router.post('/vendor/register', vendorRegister)
router.post('/vendor/login', vendorLogin)

//Premium Features
router.post('/user/verification', requireSignIn, verifyUser)

//password updates
router.post('/password/change', changePassword)
router.post('/password/confirm', confirmPasscode)
router.put('/password/update', requireSignIn, updatePassword)

module.exports = router