import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import { nextTick } from "vue";
import { MenuComponent } from "@/assets/ts/components";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "/account",
        name: "account",
        component: () => import("@/components/page-layouts/Profile.vue"),
        meta: {
          breadcrumbs: ["Account"],
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
            meta: {
              pageTitle: "Account Overview",
            },
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
            meta: {
              pageTitle: "Account Settings",
            },
          },
        ],
      },
      {
        path: "/diagnose",
        name: "diagnose",
        component: () => import("@/views/diagnoses/Diagnose.vue"),
        meta: {
          pageTitle: "Diagnose",
          breadcrumbs: ["Diagnose"],
        },
      },
      {
        path: "/diagnose/result",
        name: "diagnose-result",
        component: () => import("@/views/diagnoses/DiagnoseResult.vue"),
        meta: {
          pageTitle: "Diagnose Result",
          breadcrumbs: ["Diagnose", "Result"],
        },
      },
      {
        path: "/history",
        name: "history",
        component: () => import("@/views/history/History.vue"),
        meta: {
          pageTitle: "History",
          breadcrumbs: ["History"],
        },
      },
      {
        path: "/history/detail/:diagnoseUuid",
        name: "history-detail",
        component: () => import("@/views/history/HistoryDetail.vue"),
        meta: {
          pageTitle: "History Detail",
          breadcrumbs: ["History", "Detail"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/password/reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
      {
        path: "/password/reset/confirm/:uid/:token",
        name: "password-reset-confirm",
        component: () =>
          import(
            "@/views/crafted/authentication/basic-flow/PasswordResetConfirm.vue"
          ),
        meta: {
          pageTitle: "Password reset confirm",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // Current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;

  // Reset config to initial state
  configStore.resetLayoutConfig();

  // Check if the route requires auth
  if (to.meta.middleware === "auth") {
    let isAuthenticated = authStore.isAuthenticated;

    if (!isAuthenticated) {
      isAuthenticated = await authStore.verifyAuth();
    }

    if (!isAuthenticated) {
      isAuthenticated = await authStore.refreshToken();
    }

    if (!isAuthenticated) {
      next({ name: "sign-in" });
      return;
    }
  }

  if (to.name === "sign-in" || to.name === "sign-up") {
    // If user is authenticated and tries to access login page, redirect to dashboard
    const isAuthenticated = await authStore.verifyAuth();
    if (isAuthenticated) {
      next({ name: "dashboard" });
      return;
    }
  }

  next();

  // Scroll page to top on every route change
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    MenuComponent.reinitialization();
  });
});

export default router;
