<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <!--begin::Col-->
    <div class="col-xl-6">
      <SampleDiseasesWidget className="h-md-100" />
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-6">
      <DiagnoseWidget className="h-md-100" modal-id="kt_modal_start_diagnose" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->

  <StartDiagnoseModal />
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import SampleDiseasesWidget from "@/components/dashboard-default-widgets/Widget7.vue";
import DiagnoseWidget from "@/components/dashboard-default-widgets/Widget5.vue";
import StartDiagnoseModal from "@/components/modals/wizards/StartDiagnoseModal.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    SampleDiseasesWidget,
    DiagnoseWidget,
    StartDiagnoseModal,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
