const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: 'cyranoapp',
  api_key: '733486973761866',
  api_secret: 'owyDSp9bY654fFLltnFuUmVrvgQ'
  });

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'usersimages',
  allowedFormats: ['jpg', 'png','gif']
});
 
const parser = multer({ storage: storage });

module.exports = parser