// Appwrite configuration
import { Client, Databases } from 'appwrite';

const client = new Client();
const database = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('6734a05c0020179ec136'); // Replace with your actual project ID

const databaseID = '6734ad29001282b4cd9d'; // Replace with your actual database ID
const collectionID = '6734ace7000380fe053b'; // Replace with your collection ID

// Store phone number in Appwrite
async function storePhoneNumber(mobileNumber) {
    try {
        await database.createDocument(databaseID, collectionID, {
            mobileNumber: mobileNumber
        });
        console.log("Phone number stored successfully in Appwrite.");
    } catch (error) {
        console.error("Error storing phone number in Appwrite:", error);
    }
}

// Event listener for "Continue" button (without OTP)
document.getElementById('continue-btn').addEventListener('click', async function() {
    const mobileNumber = document.getElementById('mobile-number').value;

    if (!mobileNumber) {
        alert("Please enter a valid mobile number.");
        return;
    }

    // Store mobile number in the database
    await storePhoneNumber(mobileNumber);

    // Hide mobile number form and display success message
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.success-message').style.display = 'block';

    console.log("Phone number stored successfully.");
});
