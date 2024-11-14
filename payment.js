const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const PaytmChecksum = require('./PaytmChecksum');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MID = 'YOUR_MID_HERE';
const MERCHANT_KEY = 'YOUR_MERCHANT_KEY';
const WEBSITE_NAME = 'YOUR_WEBSITE_NAME';
const CALLBACK_URL = 'YOUR_CALLBACK_URL';

app.post('/paytm-payment', (req, res) => {
    const { orderId, txnAmount, custId } = req.body;

    const paytmParams = {
        body: {
            requestType: 'Payment',
            mid: MID,
            websiteName: WEBSITE_NAME,
            orderId: orderId,
            callbackUrl: CALLBACK_URL,
            txnAmount: {
                value: txnAmount,
                currency: 'INR',
            },
            userInfo: {
                custId: custId,
            },
        },
    };

    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), MERCHANT_KEY).then(function(checksum) {
        paytmParams.head = {
            signature: checksum,
        };

        const post_data = JSON.stringify(paytmParams);

        const options = {
            hostname: 'securegw.paytm.in',
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${MID}&orderId=${orderId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length,
            },
        };

        const response = [];
        const req = https.request(options, (res) => {
            res.on('data', (chunk) => {
                response.push(chunk);
            });

            res.on('end', () => {
                const responseBody = Buffer.concat(response).toString();
                res.json(JSON.parse(responseBody));
            });
        });

        req.write(post_data);
        req.end();
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
