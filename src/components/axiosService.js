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

async function logout() {
    await initializeCsrf();  // Ensure CSRF token is set before login
    const response = await axiosInstance.get('/logout');
    return response.data;  // return the whole response data object
}

async function register(email, password, username, firstName, lastName) {
    await initializeCsrf();  // Ensure CSRF token is set before login
    const response = await axiosInstance.post('/register', {
        'email': email,
        'password': password,
        'username': username,
        'first_name': firstName,
        'last_name': lastName
    });
    return response.data;
}

// Function to initialize app data
async function initializeApp() {
    const response = await axiosInstance.get('/initialize');
    return response.data;
}

async function posts(page, userId) {
    const response = await axiosInstance.get('/posts', {
        params: {
            user_id: userId,
            page: page,
        },
    });
    return response.data;
}

async function post(postId) {
    const response = await axiosInstance.get('/posts/' + postId);
    return response.data;
}

async function createComment(postId, commentBody) {
    const response = await axiosInstance.post('/posts/' + postId + '/comments', {
        'body': commentBody
    });
    return response.data;
}

async function createPost(title, body) {
    const response = await axiosInstance.post('/posts', {
        'title': title,
        'body': body
    });
    return response.data;
}

async function getUserDetails(userId) {
    const response = await axiosInstance.get('/users/' + userId);
    return response.data;
}

async function toggleFollow(userId) {
    const response = await axiosInstance.post('/users/' + userId + '/follow');
    return response.data;
}


export {register, login, initializeApp, logout, posts, post, createPost, createComment, getUserDetails, toggleFollow};
