import axios from 'axios';

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
async function initializeApp(router) {
    const response = await axiosInstance.get('/initialize');

    window.Echo.channel('public.social-app.' + response.data.uuid +'.comment')
        .listen('.commentUpdated', (e) => {
            showSnackbar('Comment received on post:' + e.post_id + "!" , e.post_id, router);
        });

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

async function createPost(formData) {
const response = await axiosInstance.post('/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // This might be optional as Axios sets it automatically when using FormData
        }
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

async function searchUsers(query) {
    const response = await axiosInstance.get('/users', {
        params: {
            value: query,
        },
    });
    return response.data;
}

function showSnackbar(message, postId, router) {
    // Get the snackbar DIV
    let snackbar = document.getElementById("snackbar");

    // If it doesn't exist, create it
    if (!snackbar) {
        snackbar = document.createElement("div");
        snackbar.id = "snackbar";
        document.body.appendChild(snackbar);
    }

    // Set the message
    snackbar.textContent = message;

    // Set onclick to redirect to the post
    snackbar.onclick = function() {
        if(router.currentRoute.path !== `/post/${postId}`)
            router.push({ path: `/post/${postId}` });
    };

    // Add the "show" class to DIV
    snackbar.className = "show";

    // After 3 seconds, remove the show class from DIV and clear onclick to prevent memory leaks
    setTimeout(function() {
        snackbar.className = snackbar.className.replace("show", "");
        snackbar.onclick = null; // Remove the onclick event handler
    }, 3000);
}



export {
    register,
    login,
    initializeApp,
    logout,
    posts,
    post,
    createPost,
    createComment,
    getUserDetails,
    toggleFollow,
    searchUsers
};
