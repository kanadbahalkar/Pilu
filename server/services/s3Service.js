const crypto = require('crypto');

module.exports = {
    uploadImageToS3Bucket: function(req, res) {
        const date = new Date().toISOString().replace(/[\.\-:]/gi, "").substr(0, 15) + "Z";
        const dateNowRaw = date.substr(0, date.indexOf("T"));

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        const expiration = expirationDate.toISOString();

        const credentials = 'AKIAJJ4VG64QHOZSQI2Q/' + dateNowRaw + '/us-east-1/s3/aws4_request';
        const policy = {
            expiration: expiration,
            conditions: [
                {"bucket": "piluftw"},
                {"acl": "private"},
                ["starts-with", "$key", ""],
                ["starts-with", "$Content-Type", ""],
                {"x-amz-credential": credentials},
                {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                {"x-amz-security-token": "uOETc8VmuTSeW7V+FLxKYQetHY3XCBU7sV9Xnu0s"},
                {"x-amz-date": date} 
            ]
        };

        const base64Policy = new Buffer(JSON.stringify(policy), "utf-8").toString("base64");

        const dateKey = crypto.createHmac('sha256', "AWS4" + "AKIAJJ4VG64QHOZSQI2Q").update(dateNowRaw).digest();
        const dateRegionKey = crypto.createHmac('sha256', dateKey).update('us-east-1').digest();
        const dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update('s3').digest();
        const signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();

        const signature = crypto.createHmac('sha256', signingKey).update(base64Policy).digest('hex');

        res.status(200).json({
            signature: signature,
            policy: base64Policy,
            date: date,
            credentials: credentials,
            expiration: expiration,
            sessionToken: "uOETc8VmuTSeW7V+FLxKYQetHY3XCBU7sV9Xnu0s"
        });
    }
}