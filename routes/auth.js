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
    getAllUsers
} from "../controllers/auth"
import { requireSignIn } from "../middlewares"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/admin/login', adminLogin)

//user interactions
router.get('/user/all', getAllUsers)
router.post('/user/update', requireSignIn, updateUser)
router.put('/user/delete', requireSignIn, deactivateUser)

//Premium Features
router.post('/user/verification', requireSignIn, verifyUser)

//password updates
router.post('/password/change', changePassword)
router.post('/password/confirm', confirmPasscode)
router.put('/password/update', requireSignIn, updatePassword)

module.exports = router