const {Upload} = require("@aws-sdk/lib-storage")
const {S3Client} = require("@aws-sdk/client-s3")
const dotenv = require("dotenv")

dotenv.config();


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    endpoint: process.env.AWS_URL,
})

const uploadFile = async (buffer, key) => {
    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.AWS_BUCKET,
                Body: buffer,
                Key: "camper/" + key,
            }
        });

        const data = await upload.done()

        if(data?.$metadata?.httpStatusCode === 200){
            return data.Location;
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {uploadFile}