import { ethers } from 'ethers';
// import { users } from '../../utils/users'

export default function verify(req, res) {
  let authenticated = false;
  const { address, signature, message } = req.query;
  const decodedAddress = ethers.utils.verifyMessage(message, signature);
  if (address.toLowerCase() === decodedAddress.toLowerCase()) authenticated = true;
  res.status(200).json({ authenticated });
}
