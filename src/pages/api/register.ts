import { setCookie } from "../../utils/cookies";

interface RegisterParams {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export const register = async (params: RegisterParams) => {
  const result = await (
    await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "content-type": "application/json" },
    })
  ).json();
  return result;
};

const handler = async (req, res) => {
  const params = req.body;
  const registerRes = await await fetch(`https://api.dpop.tech/api/register`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: { "content-type": "application/json" },
  });
  const result = await registerRes.json();
  if (result.status === 'success') {
    setCookie(res, "token", result.authorization.token);
  }
  res.status(registerRes.status).json(result);
};

export default handler;
