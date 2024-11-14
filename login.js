const express = require('express');
const bodyParser = require('body-parser');
const { verifyOTP } = require('./otpController'); // Import the otpController.js file

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle OTP verification
app.post('/verify-otp', (req, res) => {
    const enteredOTP = req.body.otp;
    const correctOTP = req.body.correctOTP;

    // Verify the OTP using the verifyOTP function from otpController.js
    if (verifyOTP(enteredOTP, correctOTP)) {
        res.status(200).json({ success: true, message: 'OTP verified' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
