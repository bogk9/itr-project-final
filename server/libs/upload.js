const sharp = require('sharp');
const {uuid} = require('uuidv4');
const aws = require('aws-sdk');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const s3 = new aws.S3();

const pushToS3 = (data, key) => {
  return new Promise((resolve, reject) => 
  s3.upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    Body: data
  }, (err, data) => {
    if(err) reject(err);
    else resolve(data);
  }))
}

const upload = (req, res, next) => {
  if(!req.files[0]) { return next()}
  req.img_key = uuid();
  sharp(req.files[0].buffer)
  .resize(400)
  .jpeg({quality: 50})
  .toBuffer()
  .then(data => pushToS3(data, req.img_key))
  .then(() => next())
  .catch((err) => res.status(400).json({ message: "Photo upload error." }))
}

module.exports  = upload;

