import { setCookie } from '../../utils/cookies';

export const login = async (email: string, password: string) => {
    const result = await (await fetch(`https://api.detroiter.network/api/login`, {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'content-type': 'application/json' }
    })).json();
    return result;
};

const handler = async (req, res) => {
    const params = req.body;
    const loginRes = await (await fetch(`https://api.detroiter.network/api/login`, {
        method: 'POST',
        body: JSON.stringify({email: params.email, password: params.password}),
        headers: { 'content-type': 'application/json' }
    }));
    const result = await loginRes.json();
    setCookie(res, 'token', result.authorization.token);
    res.status(loginRes.status).json(result);
}

export default handler;