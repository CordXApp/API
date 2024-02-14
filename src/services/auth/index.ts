import { Summary, Component } from 'root/@types/v3/status';
import { StatusRequestCompFilter, GetStatusSummary, GetComponents } from '../../middleware/instatus';
import { MethodType } from '../../middleware/instatus';

export const AuthorizeUser = async (req, res) => {

    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

    const scope = ['identify', 'guilds'];
    const prompt = 'none';
    let redirect;

    if (process.env.NODE_ENV === 'development') redirect = 'http://localhost:3000/api/v3/auth/callback';
    else redirect = 'https://api.cordx.lol/v3/auth/callback';

    const auth_qs = new URLSearchParams({
        client_id: process.env.ClientID as string,
        redirect_uri: redirect,
        response_type: 'code',
        prompt: prompt,
        scope
    }).toString();

    const auth_url = `https://discord.com/api/oauth2/authorize?${auth_qs}`;

    return res.redirect(auth_url);
}