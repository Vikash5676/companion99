const { S3Client, GetObjectCommand, PutObjectAclCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

require('dotenv').config()

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECURITY_KEY
    }
})

const getImageUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: 'companion-s3-bucket',
        Key: key
    })
    const url = await getSignedUrl(s3Client, command)
    return url;
}

const postImageUrl = async (fileName, contentType) => {
    const command = new PutObjectCommand({
        Bucket: 'companion-s3-bucket',
        Key: `news/${fileName}`,
        ContentType: contentType,
        ACL: 'public-read',
    })
    const url = await getSignedUrl(s3Client, command)
    return url;
}

const changeImageUrl = async (fileName, contentType) => {
    try {
        const command = new PutObjectAclCommand({
            Bucket: 'companion-s3-bucket',
            Key: `news/${fileName}`,
            ContentType: contentType,
            ACL: 'public-read',
        })
        const publicUrl = await s3Client.send(command)
        console.log(publicUrl)
        return publicUrl;
    } catch (error) {
        console.log(error)
    }
}


module.exports = { s3Client, getImageUrl, postImageUrl }