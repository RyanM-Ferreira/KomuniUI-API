import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; 
const GOOGLE_PLACES_URL = 'https://places.googleapis.com/v1/places:searchText';

export async function searchPlaces(textQuery, fields = ['places.displayName','places.formattedAddress']) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': fields.join(',')
    };

    const body = {
        textQuery
    };

    const response = await axios.post(GOOGLE_PLACES_URL, body, { headers });
    return response.data.places || [];
}