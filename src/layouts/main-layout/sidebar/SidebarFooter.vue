<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <span
      class="dongle-regular d-flex justify-content-center text-white text-nowrap overflow-hidden"
    >
      Made with <span class="fs-6 pt-2">❤️</span> by dev team.
    </span>
    <!-- <a
      href="https://preview.keenthemes.com/metronic8/vue/docs/#/doc-overview"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip"
      data-bs-trigger="hover"
      data-bs-dismiss-="click"
      title="200+ in-house components and 3rd-party plugins"
    >
      <span class="btn-label">Docs &amp; Components</span>
      <KTIcon icon-name="document" icon-class="btn-icon fs-2 m-0" />
    </a> -->
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle&display=swap");
.dongle-regular {
  font-family: "Dongle", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  font-style: normal;
}
</style>
