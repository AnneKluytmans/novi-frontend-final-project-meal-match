// API key's
export const API_KEY_AUTH = import.meta.env.VITE_API_KEY_AUTH;
export const API_KEY_EDAMAM = import.meta.env.VITE_API_KEY_EDAMAM;

// API APP ID's
export const API_ID_EDAMAM = import.meta.env.VITE_API_ID_EDAMAM;

// API request url's
export const API_URL_AUTH = "https://api.datavortex.nl/mealmatch"
export const API_URL_EDAMAM = "https://api.edamam.com/api/recipes/v2"

// API request Edamam field param
export const apiEdamamFieldParam = ['uri', 'label', 'image', 'source', 'url', 'healthLabels', 'ingredients', 'calories', 'totalWeight', 'totalTime', 'cuisineType', 'dishType']