const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling", //'spicedling'
            ACL: "public-read", //access control list
            Key: filename, // 'funkychicken/' + filename
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size
        })
        .promise()
        .then(() => {
            next();
            //to delete an image from public folder
            fs.unlink(path, () => {}); //noop - no operation function
        })
        .catch(err => {
            console.log("error on putObject", err);
            res.sendStatus(500);
        });
};

exports.delete = function(id) {
    let filesToDelete = function() {
        s3.listObjectsV2(
            {
                Bucket: "spicedling",
                Prefix: "katsia" + id
            },
            data => {
                return data;
            }
        );
    };

    s3.deleteObject(
        {
            Bucket: "spicedling",
            Key: filesToDelete
        },
        function(err, data) {
            console.log(data);
        }
    );
};
