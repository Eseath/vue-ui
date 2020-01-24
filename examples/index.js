import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/styles/common.scss';
import PageExampleSelect from './pages/select';
import PageExampleButton from './pages/button';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/components/select',
            component: PageExampleSelect,
        },
        {
            path: '/components/button',
            component: PageExampleButton,
        },
    ],
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
