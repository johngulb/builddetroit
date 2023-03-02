import { ethers } from "ethers";
import crypto from 'crypto';

export default function handler(req, res) {

    var id = crypto.randomBytes(32).toString('hex');
    var privateKey = "0x"+id;
    console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

    var wallet = new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);
    // Check if user exists
    // ... search in database for user and returns its current nonce
    // res.status(200).json({ status: 'needs development' });
}
