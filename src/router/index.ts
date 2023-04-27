/* eslint-disable */
import {
  createRouter,
  createWebHashHistory,
  LocationQueryRaw,
} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import usePermission from '@/hooks/permission';
import { useUserStore } from '@/store';
import PageLayout from '@/layout/page-layout.vue';
import { isLogin,isVolunteerLogin } from '@/utils/auth';
import Login from './modules/login';
import appRoutes from './modules';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name:'home',
      component:()=>import("@/views/Home.vue"),
      redirect: '/index',
      children:[
        {
            path:'index',
            name:'index',
            component:()=>import("@/views/Index.vue")
        },
        {
          path:'information',
          name:'information',
          component:()=>import("@/views/Information/Information.vue"),
          children:[
            {
              path:'infochild',
              name:'infochild',
              component:()=>import('@/views/Information/informations/info.vue')
            }
          ]
        },
        {
          path:'competition',
          name:'competition',
          component:()=>import("@/views/Competition/Competition.vue")
        },
        {
            path:'volunteerService',
            name:'volunteerService',
            component:()=>import("@/views/VolunteerService/VolunteerService.vue"),
        }
        // {
        //     path:'backStage',
        //     name:'backStage',
        //     component: PageLayout,
        //     // component:()=>import("@/views/BackStage.vue"),
        //     redirect:'login',

        //     children: appRoutes,
        // }
    ]
    },
    {
      path:'/preview',
      name:'preview',
      component:()=>import("@/views/backStage/result/error/info.vue")
    },
    {
      path:'/test',
      name:'test',
      component:()=>import('@/views/sxt.vue')
    },
    {
      path: "/",
      name: "VolunteerService",
      component: () => import("@/views/VolunteerService/VolunteerService.vue"),
      redirect: "/ind-index",
      children: [
        {
          path: "volunteerService",
          name: "volunteerService",
          component: () =>
              import("@/views/VolunteerService/VolunteerService.vue"),
        },
        {
          path: "ind-index",
          name: "ind-index",
          component: () =>
              import("@/views/VolunteerService/Vs-components/ind-index.vue"),
        },
        {
          path: "Ind-center",
          name: "Ind-center",
          component: () =>
              import("@/views/VolunteerService/Vs-components/Ind-center.vue"),
        },
        {
          path: "re-login",
          name: "re-login",
          component: () =>
              import("@/views/VolunteerService/Vs-components/re-login.vue"),
        },
        {
          path: "re-register",
          name: "re-register",
          component: () =>
              import("@/views/VolunteerService/Vs-components/re-register.vue"),
        },
        {
          path: "Ch-psw",
          name: "Ch-psw",
          component: () =>
              import("@/views/VolunteerService/Vs-components/Ch-psw.vue"),
        },
        {
          path: "selectType",
          name: "selectType",
          component: () =>
              import("@/views/VolunteerService/Vs-components/selectType.vue"),
        },
        {
          path: "apply",
          name: "apply",
          component: () =>
              import("@/views/VolunteerService/Vs-components/apply.vue"),
        },
      ],
    },
    {
      name:'resume',
      path:'/resume',
      component:()=>import('@/views/resume.vue')
    },
    {
      path:'/backStage',
      name:'backStage',
      component: PageLayout,
      // component:()=>import("@/views/BackStage.vue"),
      redirect:'login',

      children: appRoutes,
  },
    Login,
    // {
    //   name: 'root',
    //   path: '/',
    //   component: PageLayout,
    //   children: appRoutes,
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/backStage/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  const unGuardRoute = ['index','information','competition','volunteerService','ind-index','re-login','re-register','resume','Ch-psw','selectType','apply']
  // to.name === 'index' || to.name === 'information' || to.name === 'competition'|| to.name==='volunteerService' || to.name==='ind-index' || to.name==='re-login' || to.name==='re-register'
  if (unGuardRoute.includes(to.name)) {
    next()
    NProgress.done();
    return
  }

  if(to.name==='Ind-center' && !localStorage.getItem('volunteertoken')) {
    next('re-login')
    NProgress.done();
    return
  }

  if (to.name==='Ind-center' && localStorage.getItem('volunteertoken')) {
    next()
    NProgress.done();
    return
  }
  async function crossroads() {
    const Permission = usePermission();
    if (Permission.accessRouter(to)) await next();
    else {
      const destination = Permission.findFirstPermissionRoute(
        appRoutes,
        userStore.role
      ) || {
        name: 'notFound',
      };
      await next(destination);
    }
    NProgress.done();
  }
  if (isLogin()) {
    if (userStore.role) {
      crossroads();
    } else {
      try {
        await userStore.info();
        crossroads();
      } catch (error) {
        next({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        });
        NProgress.done();
      }
    }
  } else {
    if (to.name === 'login') {
      next();
      NProgress.done();
      return;
    } else if(to.name === 'ind-center') {
      next({
        name: 're-login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    });
    NProgress.done();
  }
});

export default router;
