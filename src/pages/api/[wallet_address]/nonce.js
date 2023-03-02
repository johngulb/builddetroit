// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // Check if user exists
    // ... search in database for user and returns its current nonce
    res.status(200).json({ status: 'needs development' });
}
