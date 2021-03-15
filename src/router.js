import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/pages/Main";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main
    }
];

Vue.use(Router);

const router = new Router({routes});

export default router;
