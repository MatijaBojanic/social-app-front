import axios from 'axios';

console.log( process.env.VUE_APP_API_URL);
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
    withXSRFToken: true,
});

// Function to initialize CSRF protection
async function initializeCsrf() {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('CSRF token setup failed:', error);
    }
}

// Function to handle login
async function login(email, password) {
    await initializeCsrf();  // Ensure CSRF token is set before login
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;  // return the whole response data object
}

// Function to initialize app data
async function initializeApp() {
    const response = await axiosInstance.get('/initialize');
    return response.data;
}

export { login, initializeApp };
