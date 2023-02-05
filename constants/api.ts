import axios from 'axios';
import qs from 'qs';
// constants
import { client_secret, client_id } from './settings';

const BASE_URL = 'https://api.spotify.com/v1';
let AccessToken = null;

const TokenHeaders = {
    headers: { 
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded' 
    }
  }

async function getAccessHeaders () {
    const access_token = await getToken()
    console.log('Access token:', access_token)
    return ({
      headers: { 
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json' 
      }})
  }

function handleError(error) {
  console.error(error);
  return error;
}

export async function getToken() {
    if (!AccessToken) {
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({'grant_type':'client_credentials'}), TokenHeaders)
        AccessToken = response.data.access_token
        setTimeout(() => {console.log('clearing token'); AccessToken = null}, 3600)
      } catch (error) {
          return handleError(error)
      }
    }
    return AccessToken;
}

export async function getSong() {
  try {
      const headers = await getAccessHeaders()
      const response = await axios.get(`${BASE_URL}/tracks/2TpxZ7JUBn3uw46aR7qd6V`, headers)
  } catch (error) {
      return handleError(error)
  }
}

getSong()