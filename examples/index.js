import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/styles/common.scss';
import PageExampleSelect from './pages/select';
import PageExampleButton from './pages/button';
import PageExampleInput from './pages/input';
import PageExampleToggle from './pages/toggle';

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
        {
            path: '/components/input',
            component: PageExampleInput,
        },
        {
            path: '/components/toggle',
            component: PageExampleToggle,
        },
    ],
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
