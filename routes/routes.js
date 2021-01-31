const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { User } = require('../modal/users')


router.get('/users', (req, res) => {
    res.status(200).json({
        success: true,
        user: 'user',
        url: 'http://localhost:3000/upload/resize_file/r1612102098392.jpg'
    })
})


router.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        console.log(user)
        return res.status(201).send({
            success: false,
            message: 'success',
            user: user
        })
    }).catch((err) => {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    })
})

router.post('/product', (req, res) => {
    res.send('hello')
})

router.post('/test', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload')
    },
    filename: function(req, file, cb) {
        cb(null, 'img' + '-' + Date.now() + '.jpg')
    }
})

var upload = multer({ storage: storage })

router.post('/profile', upload.single('file_upload'), async(req, res) => {
    let timestamp = Date.now()
    await sharp(`./upload/${req.file.filename}`)
        .resize(200, 200, {
            fit: 'contain',
            width: 400,
            height: 400
        })
        .toFile(`upload/resize_file/r${timestamp}.jpg`, (err, info) => {
            if (err) {
                return res.send({
                    success: false,
                    message: err.message
                })
            }
            return res.send({
                success: true,
                message: 'success',
                url: `http://localhost:3000/upload/resize_file/r${timestamp}.jpg`,
                info: info
            })
        })
})

module.exports = router