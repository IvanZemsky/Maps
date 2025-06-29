import { createRouter, createWebHistory } from "vue-router"
import { MainLayout } from "@/layouts/main"

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         component: MainLayout,
         redirect: "/",
         children: [
            {
               path: "/",
               component: () => import("@/pages/home-page.vue"),
               meta: {
                  title: "Home",
               },
            },
         ],
      },
   ],
})

export default router
