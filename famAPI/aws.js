const aws = require('aws-sdk');

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGEON,
});

exports.signS3 = async (req, res) => {
  try {
    const s3 = new aws.S3();
    const response = await s3.listObjectsV2({
      Bucket: process.env.AWS_BUCKET_NAME,
    });
    console.log('RESPONSE: ', response);
  } catch (err) {
    console.log(err);
  }
};
