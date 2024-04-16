const express = require('express');
const router = express.Router();
const User = require('../models/User');
var ResHelper = require('../helper/ResponseHandle');

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
var configs = require('../config/config')
var Validator = require('../validators/user');
const { validationResult } = require('express-validator');

router.post('/register', Validator.UserValidate(), async function (req, res, next) {
    var errors = validationResult(req).errors;
    if (errors.length > 0) {
      ResHelper.ResponseSend(res, false, 404, errors);
      return;
    }
    try {
      const existingUser = await User.findOne({email : req.body.email });
      if(existingUser) {
        ResHelper.ResponseSend(res, false, 400, "Tên người dùng đã tồn tại trong hệ thống.");
        return;
      }
      var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: ['USER']
      })
      await newUser.save();
      ResHelper.ResponseSend(res, true, 200, newUser)
    } catch (error) {
      ResHelper.ResponseSend(res, false, 404, error)
    }
  });

router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email và mật khẩu phải điền đầy đủ' });
        }

        // Tìm người dùng dựa trên email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email hoặc mật khẩu không đúng' });
        }

        // So sánh mật khẩu được nhập với mật khẩu đã băm
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = user.getJWT();
            console.log(user);
            // Lưu token vào cookie
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ success: true, token: token });
        } else {
            return res.status(404).json({ error: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập' });
    }
});



router.get('/thongtin', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
//update
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'email', 'address'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/customers', async (req, res) => {
    try {
        const customers = await User.find({ role: 'USER' }); // Lấy danh sách khách hàng (có vai trò USER)
        res.send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
