// Trong tệp app.js hoặc index.js:

const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const app = express();


// Cấu hình session middleware
app.use(session({
  secret: 'hello', // Thay thế 'secret_key' bằng một chuỗi bí mật thực tế
  resave: false,
  saveUninitialized: false
}));


// Kết nối đến MongoDB
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/webbanhang";
mongoose.connect(MONGO_URL).then(() => {
  console.log("Database is connected");
});

// Sử dụng middleware CORS
app.use(cors());

// Các middleware khác
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối router '/users' với ứng dụng Express
const usersRouter = require('./routes/users');
app.use('/users', usersRouter); // Thêm router users vào ứng dụng Express với tiền tố '/users'

// Các định tuyến
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Xử lý lỗi 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Xử lý lỗi
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
