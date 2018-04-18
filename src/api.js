import axios from 'axios';

let api = null;

function getInitializedApi() {
    if (api) return api; // return initialized api if already initialized.
    return (api = axios.create({
        baseURL: getBaseUrl(),
        responseType: 'json'
    }));
}

// Helper functions
function getBaseUrl() {
    if (process.env.NODE_ENV === "development") return process.env.API_URL;
    // Insert logic here to get the baseURL by either:
    // 1. Sniffing the URL to determine the environment we're running in.
    // 2. Looking for an environment variable as part of the build process.
}

function get() {
    return getInitializedApi()
            .get()
            .then(response => response.data[0]);
}

// Public functions
// Note how short these are due to the centralized config and helpers above. 😎
export function getQuestion() {
    return get();
}