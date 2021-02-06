const express = require('express')
const router = express.Router()

// Controllers
const usersController = require('../controller/users.controller')

// Middlewares
const uploadMiddleware = require('../middleware/upload.middleware')

// Get All users
router.get('/users', usersController.getAllUsers)

// Get All qrcodes
router.get('/qrcodes', usersController.getAllQrcode)


// Get user
router.get('/users/:userid', usersController.getUser)

// Create new user
router.post('/users', usersController.createUsers)

// update user
router.patch('/users/:id', usersController.updateUsers)

// delete user
router.delete('/users/:id', usersController.deleteUsers)

// upload image and resize image file
router.post('/profile', uploadMiddleware.upload.single('images'), usersController.uploadProfile)

// Get user
router.get('/test', usersController.test)

// get_profiles
router.get('/profiles', usersController.get_profiles)


module.exports = router