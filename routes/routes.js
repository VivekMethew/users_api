const express = require('express')
const router = express.Router()

const users = [{
    id: 1,
    name: 'vivek kumar',
    email: 'vivekmethew8@gmail.com',
    phone: '9718546885',
    address: 'Shiv vihar',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}, {
    id: 2,
    name: 'vishal',
    email: 'vishal@gmail.com',
    phone: '7011730934',
    address: 'gokul puri',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}, {
    id: 3,
    name: 'vivek kumar',
    email: 'vivekmethew8@gmail.com',
    phone: '9718546885',
    address: 'Shiv vihar',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}, {
    id: 4,
    name: 'vivek kumar',
    email: 'vivekmethew8@gmail.com',
    phone: '9718546885',
    address: 'Shiv vihar',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}, {
    id: 5,
    name: 'vivek kumar',
    email: 'vivekmethew8@gmail.com',
    phone: '9718546885',
    address: 'Shiv vihar',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}, {
    id: 4,
    name: 'vivek kumar',
    email: 'vivek methew8@gmail.com',
    phone: '9718546885',
    address: 'Shiv vihar',
    city: 'new delhi',
    state: 'delhi',
    pincode: '110059'
}]

router.get('/users', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.query.id)) //console.log(req.query)
    res.send({
        success: true,
        user: user
    })
})

module.exports = router