<template>
  <!--begin::Mixed Widget 4-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <div class="flex-grow-1">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <!--begin::Chart-->
          <div class="col" v-for="(item, index) in chartData" :key="index">
            <div
              class="chart-container d-flex flex-column justify-content-center align-items-center h-100"
            >
              <apexchart
                :ref="`chartRef${index}`"
                class="mixed-widget-4-chart"
                :options="getChartOptions(item.label)"
                :series="[item.value]"
                :height="'100%'"
                type="radialBar"
              ></apexchart>
            </div>
          </div>
          <!--end::Chart-->
        </div>
      </div>
      <div class="pt-5">
        <p class="text-center fs-6 pb-5">
          <span class="badge badge-light-danger fs-8">Notes:</span>&nbsp;
          <span>The result may be wrong. Check for more info.</span>
        </p>

        <a href="#" :class="`btn-${btnColor}`" class="btn w-100 py-3">
          {{ t("rediagnose") }}
        </a>
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Mixed Widget 4-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, watch } from "vue";
import type { ApexOptions } from "apexcharts";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "widget-1",
  components: {},
  props: {
    widgetClasses: String,
    chartColor: String,
    chartHeight: {
      type: String,
      default: "200",
    },
    btnColor: String,
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const store = useThemeStore();

    const chartData = computed(() => [
      { label: "Healthy", value: props.data?.details?.healthy ?? 0 },
      { label: "Late Blight", value: props.data?.details?.late_blight ?? 0 },
      { label: "Early Blight", value: props.data?.details?.early_blight ?? 0 },
    ]);

    const themeMode = computed(() => store.mode);

    const getChartOptions = (label: string): ApexOptions => ({
      chart: {
        height: "100%",
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "65%",
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              fontWeight: "700",
              offsetY: 5,
              formatter: function (val) {
                return val.toFixed(2) + "%";
              },
            },
          },
        },
      },
      // responsive: [
      //   {
      //     breakpoint: 1024, // Adjust for larger screens
      //     options: {
      //       plotOptions: {
      //         radialBar: {
      //           dataLabels: {
      //             style: {
      //               fontSize: "6rem", // Font size for larger screens
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 768, // Adjust for tablet screens
      //     options: {
      //       plotOptions: {
      //         radialBar: {
      //           dataLabels: {
      //             value: {
      //               fontSize: "6rem", // Font size for tablets
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      //   {
      //     breakpoint: 480, // Adjust for mobile screens
      //     options: {
      //       plotOptions: {
      //         radialBar: {
      //           dataLabels: {
      //             value: {
      //               fontSize: "6rem", // Font size for mobile
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // ],
      colors: [getColorForLabel(label)],
      stroke: {
        lineCap: "round",
      },
      labels: [label],
    });

    const getColorForLabel = (label: string): string => {
      switch (label) {
        case "Healthy":
          return "#00E396";
        case "Early Blight":
          return "#FEB019";
        case "Late Blight":
          return "#FF4560";
        default:
          return "#000000";
      }
    };

    watch(themeMode, () => {
      // Refresh charts if needed when theme changes
    });

    return {
      chartData,
      getChartOptions,
      getAssetPath,
      t,
    };
  },
});
</script>
