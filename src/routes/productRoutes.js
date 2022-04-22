const express = require('express');
const path = require('path');

const router = express.Router();
const {addProduct,getProducts} = require('../controller/productController')
const checkAdmin = require('../middlewares/common/checkAdmin');
const checkAuthorization = require('../middlewares/common/checkAuthorization');
 const shortid = require('shortid');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null,shortid.generate() + '-' + file.originalname);
    }
  })
  const upload = multer({storage});

router.post('/add',checkAuthorization,checkAdmin,upload.array('productPicture'),addProduct);
router.get('/get',getProducts);

module.exports = router;