import axios from 'axios';
import qs from 'qs';
// constants
import { client_secret, client_id } from './settings';

// const BASE_URL = 'https://api.spotify.com/v1';
const AUTH_BASE_URL = 'https://accounts.spotify.com'


const authToken = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const authHeaders = {
    headers: { 
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded' 
    }
  }

function handleError(error) {
  console.error(error);
  return error;
}

export async function getToken() {
    try {
        const data = qs.stringify({'grant_type':'client_credentials'});
        const response = await axios.post('https://accounts.spotify.com/api/token', data, authHeaders)
        console.log('response', response)
    } catch (error) {
        return handleError(error)
    }
}

getToken()