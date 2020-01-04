import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/styles/common.scss';
import PageCheckbox from './pages/checkbox.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/components/checkbox',
            component: PageCheckbox,
        },
    ],
});

new Vue({
    el: '#app',
    render: h => h(App),
});
