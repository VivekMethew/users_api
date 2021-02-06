const { User } = require('../modal/users')
const { Profile } = require('../modal/profile.modal')
const { QrCodes } = require('../modal/qrcode.modal')
const qrcodeController = require('../controller/qrcode.controller')
const sharp = require('sharp')
const createError = require('http-errors')
const mongoose = require('mongoose')

module.exports = {
    getAllUsers: async(req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0 })
            if (!users) {
                throw createError(404, 'Users does not exists')
            }
            res.status(200).json({
                success: true,
                users: users
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    getAllQrcode: async(req, res, next) => {
        try {
            const qrcodes = await QrCodes.find({}, { __v: 0 })
            if (!qrcodes) {
                throw createError(404, 'qrcode does not exists')
            }
            res.status(200).json({
                success: true,
                qrcodes: qrcodes
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    getUser: async(req, res, next) => {
        console.log(req.params.userid)
        try {
            const user = await User.findById(req.params.userid, { __v: 0 })
            if (!user) {
                throw createError(404, 'User does not exists')
            }
            res.status(200).json({
                success: true,
                user: user
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid user id'))
                return
            }
            next(error)
        }
    },
    createUsers: async(req, res, next) => {
        try {
            const user = new User(req.body)

            await user.save().then(() => {
                qrcodeController.qrcode_gn(user)
                    .then((url) => {
                        const qrcode = QrCodes({
                            userid: user._id,
                            url: url
                        })
                        qrcode.save().then((data) => {
                            return res.status(201).send({
                                success: true,
                                message: 'success',
                                user: user,
                                qrcode: qrcode
                            })
                        }).catch(err => {
                            if (err) throw createError.NotAcceptable('allready qrcode generated')
                        })
                    }).catch(err => {
                        if (err) throw createError.BadRequest('Something went wrong')
                    })
            }).catch((err) => {
                if (err) throw createError.NotAcceptable('User allready exists')
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    deleteUsers: async(req, res, next) => {
        try {
            const result = await User.findByIdAndDelete(req.params.id)
            if (!result) {
                throw createError(404, 'Not Found User')
            }
            res.status(200).json({
                success: true,
                result: result
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    updateUsers: async(req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const options = { new: true }
            const update = await User.findByIdAndUpdate(id, updates, options)
            if (!update) {
                throw createError(404, 'Not Found')
            }
            res.status(200).json({
                success: true,
                update: update
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    uploadProfile: async(req, res, next) => {
        try {
            await sharp(`./upload/${req.file.filename}`)
                .resize(1000, 1000, {
                    fit: 'cover',
                    width: 500,
                    height: 500
                })
                .toBuffer()
                .then(data => {
                    const profile = new Profile({ url: 'data:image/png;base64,' + data.toString('base64') })
                    if (!profile) {
                        throw createError(404, 'Not Found')
                    }
                    profile.save().then(() => {
                        return res.status(201).send({
                            success: true,
                            message: 'success',
                            profile: profile
                        })
                    }).catch((err) => {
                        throw createError(500, 'Internale error')
                    })
                })
                .catch(err => {
                    throw createError(203, 'Invalid image path')
                });
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    get_profiles: async(req, res, next) => {
        try {
            const profile = await Profile.find({}, { __v: 0 })
            if (!profile) {
                throw createError(404, 'Users does not exists')
            }
            return res.status(200).json({
                success: true,
                profiles: profile
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    test: async(req, res, next) => {
        res.send(req.query)
    }
}