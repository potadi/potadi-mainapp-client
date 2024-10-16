<template>
  <!--begin::Authentication Layout -->
  <div
    class="d-flex flex-column justify-content-center align-items-center min-vh-100 bgi-size-cover bgi-position-center"
    :style="`background-image: url('${getAssetPath(
      'media/background/bg-auth.svg'
    )}')`"
  >
    <!--begin::Form-->
    <div class="w-100 p-3">
      <!--begin::Wrapper-->
      <div class="mx-auto w-lg-500px bg-white rounded shadow-sm">
        <router-view></router-view>
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Form-->
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
