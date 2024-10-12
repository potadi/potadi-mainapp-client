<template>
  <!--begin::List Widget 1-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Header-->
      <div
        :class="data?.label?.color ? `bg-${data.label.color}` : 'bg-secondary'"
        class="px-9 pt-7 card-rounded h-275px w-100"
      >
        <!--begin::Heading-->
        <div class="d-flex flex-stack">
          <h3 class="m-0 text-white fw-bold fs-3">Detail Diagnose</h3>
        </div>
        <!--end::Heading-->

        <!--begin::Balance-->
        <div class="d-flex text-center flex-column text-white pt-8">
          <span class="fw-semibold fs-6">Status</span>
          <span class="fw-bold fs-2x pt-1">{{ data?.label.status }}</span>
        </div>
        <!--end::Balance-->
      </div>
      <!--end::Header-->

      <!--begin::Items-->

      <MixedWidget4
        widget-classes="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1"
        style="margin-top: -100px"
        chart-color="danger"
        chart-height="200"
        :btn-color="data?.label.color"
        :data="data"
      ></MixedWidget4>
      <!--end::Items-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 1-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import MixedWidget4 from "@/components/widgets/mixed/Widget4.vue";

export default defineComponent({
  name: "widget-1",
  components: {
    MixedWidget4,
  },
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: Number,
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
