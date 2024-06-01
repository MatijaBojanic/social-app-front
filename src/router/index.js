import Vue from 'vue';
import Router from 'vue-router';

// Import components
import Dashboard from '@/components/DashboardPage.vue';  // Adjust path as needed
import LoginForm from '@/components/LoginForm.vue';  // Adjust path as needed
import PostPage from '@/components/PostPage.vue';  // Adjust path as needed

// Use Router
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', name: 'Login', component: LoginForm },
        { path: '/dashboard', name: 'Dashboard', component: Dashboard },
        { path: '/post/:id', name: 'PostPage', component: PostPage},
    ]
});
