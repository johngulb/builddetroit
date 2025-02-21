import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address',
        success: false
      });
    }

    // TODO: Add your email service integration here
    // Example: Save to database, add to mailing list, etc.
    
    
    // For now, just log the email
    console.log('Email captured:', email);

    return res.status(200).json({
      message: 'Email captured successfully',
      success: true
    });

  } catch (error) {
    console.error('Error capturing email:', error);
    return res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
}
