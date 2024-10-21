<template>
  <!--begin::Row-->
  <!-- Title -->
  <div>
    <h1 class="fs-1hx fw-bolder mb-5">{{ t("dashboardPage.subtitle1") }}</h1>
  </div>
  <div class="row g-5 g-xl-8">
    <div class="col-xl-4">
      <StatisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="tablet-ok"
        color="success"
        icon-color="white"
        title="Healthy"
        :description="`Total Diagnosis: ${description.healthy}`"
      ></StatisticsWidget5>
    </div>

    <div class="col-xl-4">
      <StatisticsWidget5
        widget-classes="card-xl-stretch mb-xl-8"
        icon-name="tablet-down"
        color="warning"
        icon-color="white"
        title="Early Blight"
        :description="`Total Diagnosis: ${description.early_blight}`"
      ></StatisticsWidget5>
    </div>

    <div class="col-xl-4">
      <StatisticsWidget5
        widget-classes="card-xl-stretch mb-5 mb-xl-8"
        icon-name="tablet-delete"
        color="danger"
        icon-color="white"
        title="Late Blight"
        :description="`Total Diagnosis: ${description.late_blight}`"
      ></StatisticsWidget5>
    </div>
  </div>
  <!--end::Row-->

  <div class="separator my-10"></div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import ApiService from "@/core/services/ApiService";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "main-dashboard",
  components: {
    StatisticsWidget5,
  },
  setup() {
    const { t } = useI18n();

    const description = ref({
      healthy: 0,
      early_blight: 0,
      late_blight: 0,
    });

    const fetchTotalDiseases = async () => {
      try {
        const { status, data } = await ApiService.get("/diagnose/count");
        if (status === 200) {
          data.forEach((item) => {
            const { label, count } = item;
            description.value[label] = count;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchTotalDiseases();
    });

    return {
      description,
      getAssetPath,
      t,
    };
  },
});
</script>
