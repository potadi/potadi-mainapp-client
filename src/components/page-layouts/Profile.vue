<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              :src="
                user?.avatar === null
                  ? getAssetPath('media/avatars/blank.png')
                  : user?.avatar
              "
              loading="lazy"
              alt="image"
            />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{ user?.first_name }} {{ user?.last_name }}</a
                >
                <a href="#">
                  <KTIcon icon-name="verify" icon-class="fs-1 text-primary" />
                </a>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                  {{ user?.username }}
                </a>
                <!-- <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="geolocation" icon-class="fs-4 me-1" />
                  SF, Bay Area
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  max@kt.com
                </a> -->
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
// import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "profile-page-layout",
  components: {
    // Dropdown3,
  },
  setup() {
    const store = useAuthStore();
    const user = computed(() => store.user);
    return {
      user,
      getAssetPath,
    };
  },
});
</script>
