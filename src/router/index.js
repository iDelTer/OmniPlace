import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListsView from '../views/ListsView.vue'
import NotesView from '../views/NotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Omniplace - Index',
        metaTags: [
          {
            name: 'description',
            content: 'The Home page of OmniPlace'
          },
          {
            property: 'og:description',
            content: 'The Home page of OmniPlace'
          }
        ]
      }
    },
    {
      path: '/lists',
      name: 'lists',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ListsView,
      meta: {
        title: 'Omniplace - Lists',
        metaTags: [
          {
            name: 'description',
            content: 'The Lists page of OmniPlace'
          },
          {
            property: 'og:description',
            content: 'The Lists page of OmniPlace'
          }
        ]
      }
    },
    {
        path: '/notes',
        name: 'notes',
        component: NotesView,
        meta: {
          title: 'Omniplace - Notes',
          metaTags: [
            {
              name: 'description',
              content: 'The Notes page of OmniPlace'
            },
            {
              property: 'og:description',
              content: 'The Notes page of OmniPlace'
            }
          ]
        }
      }
  ]
})

export default router