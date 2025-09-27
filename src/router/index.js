import { createRouter, createWebHistory } from "vue-router";
import PostList from "@/views/PostList.vue";
import CreatePost from "@/views/CreatePost.vue";
import EditPost from "@/views/EditPost.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'PostList',
            component: PostList
        },
        {
            path: '/create',
            name: 'CreatePost',
            component: CreatePost
        },
        {
            path: '/edit/:id',
            name: 'EditPost',
            component: EditPost
        },
    ],
})
export default router;