<template>
  <!--begin::Header-->
  <div v-if="headerDisplay" id="kt_app_header" class="app-header">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-stretch justify-content-between"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <div
        v-if="layout === 'light-header' || layout === 'dark-header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <router-link to="/">
          <div class="d-flex align-items-center">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/default-leaf.png')"
              class="h-35px app-sidebar-logo-default"
            />
            <p class="mb-0 ms-2">
              <span class="fw-bolder fs-2 text-white app-sidebar-logo-default">
                Potadi
              </span>
            </p>
          </div>
        </router-link>
      </div>
      <template v-else>
        <!--begin::sidebar mobile toggle-->
        <div
          class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
          v-tooltip
          title="Show sidebar menu"
        >
          <div
            class="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_sidebar_mobile_toggle"
          >
            <KTIcon icon-name="abstract-14" icon-class="fs-2 fs-md-1" />
          </div>
        </div>
        <!--end::sidebar mobile toggle-->
        <!--begin::Mobile logo-->
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <router-link to="/" class="d-lg-none">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/default-leaf.png')"
              class="h-35px"
            />
          </router-link>
        </div>
        <!--end::Mobile logo-->
      </template>
      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-end flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <!-- <KTHeaderMenu /> -->
        <KTHeaderNavbar />
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
// import KTHeaderMenu from "@/layouts/main-layout/header/menu/Menu.vue";
import KTHeaderNavbar from "@/layouts/main-layout/header/Navbar.vue";
import {
  headerDisplay,
  headerWidthFluid,
  layout,
  themeMode,
  headerDesktopFixed,
  headerMobileFixed,
} from "@/core/helpers/config";

export default defineComponent({
  name: "layout-header",
  components: {
    // KTHeaderMenu,
    KTHeaderNavbar,
  },
  setup() {
    return {
      layout,
      headerWidthFluid,
      headerDisplay,
      themeMode,
      getAssetPath,
      headerDesktopFixed,
      headerMobileFixed,
    };
  },
});
</script>
