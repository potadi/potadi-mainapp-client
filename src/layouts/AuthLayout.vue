<template>
  <!--begin::Authentication Layout -->
  <div
    class="d-flex flex-column flex-center flex-row-fluid bgi-size-cover bgi-position-center"
    :style="`background-image: url('${getAssetPath(
      'media/background/auth-bg-2.jpg'
    )}')`"
  >
    <!--begin::Body-->
    <div class="d-flex flex-column flex-grow-1">
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-grow-1">
        <!--begin::Wrapper-->
        <div
          class="bg-body rounded justify-content-center shadow-lg p-sm-5 my-10"
        >
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {
      getAssetPath,
    };
  },
});
</script>
