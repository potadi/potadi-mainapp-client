<template>
  <!--begin::Feeds Widget 5-->
  <div class="card" :class="widgetClasses">
    <!--begin::Body-->
    <div class="card-body pb-0">
      <!--begin::Header-->
      <div class="d-flex align-items-center mb-5">
        <!--begin::User-->
        <div class="d-flex align-items-center flex-grow-1">
          <!--begin::Info-->
          <div class="d-flex flex-column">
            <a href="#" class="text-gray-800 text-hover-primary fs-6 fw-bold">
              {{ data?.imageName }}
            </a>

            <span class="text-gray-400 fw-semibold">
              {{ data?.created_at }}
            </span>
          </div>
          <!--end::Info-->
        </div>
        <!--end::User-->
      </div>
      <!--end::Header-->
      <!--begin::Post-->
      <div class="mb-5">
        <!--begin::Image-->
        <div class="d-block overlay h-100 img-lightbox" @click="openLightbox">
          <!--begin::Image-->
          <div
            class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover rounded min-h-350px h-100 mb-5"
            :style="{
              backgroundImage: `url(${data?.image})`,
            }"
          ></div>
          <!--end::Image-->
          <!--begin::Action-->
          <div class="overlay-layer card-rounded bg-dark bg-opacity-25">
            <i class="ki-duotone ki-eye fs-3x text-white">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
          </div>
          <!--end::Action-->
        </div>
        <!--end::Image-->
      </div>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="[data?.image]"
        :index="0"
        @hide="hideLightbox"
      />
      <!--end::Post-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Feeds Widget 5-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

export default defineComponent({
  name: "widget-5",
  props: {
    widgetClasses: String,
    data: Object,
  },
  components: {
    VueEasyLightbox,
  },
  setup() {
    const visible = ref(false);

    const openLightbox = () => {
      visible.value = true;
    };

    const hideLightbox = () => {
      visible.value = false;
    };

    return {
      visible,
      openLightbox,
      hideLightbox,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.img-lightbox {
  cursor: pointer;
}
</style>
