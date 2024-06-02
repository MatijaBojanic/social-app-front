import Vue from 'vue';
import Router from 'vue-router';

// Import components
import Dashboard from '@/components/DashboardPage.vue';  // Adjust path as needed
import LoginForm from '@/components/LoginForm.vue';  // Adjust path as needed
import PostPage from '@/components/PostPage.vue';
import CreatePost from "@/components/CreatePost.vue";  // Adjust path as needed
import ProfilePage from "@/components/ProfilePage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import UserSearchPage from "@/components/UserSearchPage.vue";

// Use Router
Vue.use(Router);

export default new Router({
    mode: 'history',
    // base: 'http://localhost:8080/',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'Login', component: LoginForm },
        { path: '/register', name: 'RegisterPage', component: RegisterPage},
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/post/:id', name: 'PostPage', component: PostPage},
        {path: '/post/create', name: 'CreatePost', component: CreatePost},
        {path: '/user/:id', name: 'ProfilePage', component: ProfilePage},
        {
            path: '/users/search',
            name: 'UserSearchPage',
            component: UserSearchPage,
            props: (route) => ({ query: route.query.q })
        },
    ]
});
