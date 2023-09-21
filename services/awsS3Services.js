const AWS = require('aws-sdk');

exports.UploadToS3 = async (data, filename) => {

    const IAM_USER_KEY = 'AKIAZIGLKFEBB7B5PPNW';
    const IAM_USER_SECRET = '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';
    const BucketName = 'ankitagautambucket';

    const s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
    })

    var params = {
        Bucket: BucketName,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, response) => {
            if (err) {
                console.log('somthing went wrong', err)
                reject(err);
            } else {
                console.log('success', response.Location);
                resolve(response.Location);
            }
        })
    })
}