var express = require('express');
var router = express.Router();
var responseReturn = require('../helper/ResponseHandle')

function GenID(length) {
  var result = "";
  var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789"
  for (let index = 0; index < length; index++) {
    var random = Math.floor(Math.random() * source.length);
    result += source[random];
  }
  return result;
}

var books = [{
  id: 1,
  name: "Toan lop 1"
}, {
  id: 2,
  name: "Tieng viet lop 1"
}, {
  id: 3,
  name: "Dao duc lop 1"
}]

//hostname:port/api/v1/books
/* GET users listing. */
router.get('/', function (req, res, next) {
  //res.send('respond with a resource book');
  var undeleted = books.filter(book => !book.isdeleted);
  console.log(undeleted);
  responseReturn.ResponseSend(res, true, 200, undeleted)
});
//hostname:port/api/v1/books/1 
router.get('/:id', function (req, res, next) {
  //res.send('respond with a resource book');
  let book = books.find(book => book.id == req.params.id);
  if (!book) {
    responseReturn.ResponseSend(res, false, 404, "ID khong ton tai")
  } else {
    responseReturn.ResponseSend(res, true, 200, book)
  }
});

router.post('/add', function (req, res, next) {
  let book = books.find(book => book.id == req.body.id);
  if (book) {
    responseReturn.ResponseSend(res, false, 404, "ID da ton tai")
  } else {
    let newbook = {
      id: req.body.id,
      name: req.body.name
    }
    books.push(newbook);
    responseReturn.ResponseSend(res, true, 200, newbook);
  }
})

router.put('/edit/:id', function (req, res, next) {
  let book = books.find(book => book.id == req.params.id);
  if (!book) {
    responseReturn.ResponseSend(res, false, 404, "ID khong ton tai")
  } else {
    book.name = req.body.name
    responseReturn.ResponseSend(res, true, 200, book);
  }
})

router.delete('/delete/:id', function (req, res, next) {
  let book = books.find(book => book.id == req.params.id);
  if (!book) {
    responseReturn.ResponseSend(res, false, 404, "ID khong ton tai")
  } else {
    // let index = books.indexOf(book);
    // books.splice(index,1);
    // responseReturn.ResponseSend(res, true, 200, "Xoa thanh cong");
    book.isdeleted = true;
    responseReturn.ResponseSend(res, true, 200, "Xoa thanh cong");
  }
})


module.exports = router;
