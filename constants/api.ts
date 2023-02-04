import axios from 'axios';
// constants
import { client_secret, client_id } from './settings';

// const BASE_URL = 'https://api.spotify.com/v1';
const AUTH_BASE_URL = 'https://accounts.spotify.com/'

const AuthHeaders = {
    Authorization: `Basic ${Buffer.from(`${client_id} : ${client_secret}`, 'base64')}`,
    "Content-Type": "application/x-www-form-urlencoded",
}

function handleError(error) {
  console.error(error);
  return error;
}

export async function getToken() {
    try {
        const header = `Authorization: `;
        const response = await axios.post(`${AUTH_BASE_URL}/api/token`, new URLSearchParams({ grant_type: 'client_credentials'}), {headers: AuthHeaders})
        console.log('response', response)
    } catch (error) {
        return handleError(error)
    }
}
