<template>
  <!--begin::Layout-->
  <div v-if="!isLoading" class="d-flex flex-column flex-xl-row">
    <!--begin::Sidebar-->
    <div class="flex-column flex-lg-row-auto w-100 w-xl-550px mb-10">
      <ImageWidget v-if="diagnose" :data="diagnose" />
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-15">
      <!--begin:::Tabs-->
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8"
      >
        <!--begin:::Tab item-->
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4 active"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_tab"
            >Overview</a
          >
        </li>
        <!--end:::Tab item-->
      </ul>
      <!--end:::Tabs-->

      <!--begin:::Tab content-->
      <div class="tab-content" id="myTabContent">
        <!--begin:::Tab pane-->
        <div
          class="tab-pane fade show active"
          id="kt_customer_view_overview_tab"
          role="tabpanel"
        >
          <DetailWidget
            widget-classes="card-xl-stretch mb-xl-8"
            widget-color="primary"
            :data="diagnose"
          ></DetailWidget>
        </div>
        <!--end:::Tab pane-->
      </div>
      <!--end:::Tab content-->
    </div>
    <!--end::Content-->
  </div>

  <div v-else class="splash-screen"></div>
  <!--end::Layout-->
</template>

<script lang="ts">
import moment from "moment";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ApiService from "@/core/services/ApiService";
import DetailWidget from "@/components/widgets/mixed/Widget1.vue";
import ImageWidget from "@/components/widgets/feeds/Widget5.vue";
import type { IDiagnoses } from "@/core/data/diagnoses";

export default defineComponent({
  name: "history-details",
  components: {
    ImageWidget,
    DetailWidget,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const isLoading = ref<boolean>(true);

    const diagnose = ref<IDiagnoses | Record<string, any>>({});

    const fetchDiagnoseByUUID = async (diagnoseUuid) => {
      try {
        const response = await ApiService.get(`diagnose/${diagnoseUuid}`);
        const { data } = response;

        const newFormat = (): IDiagnoses => {
          const imageName = getImageName(data.image);
          const confidence = data.confidence;
          const formattedDate = moment(data.created_at, moment.ISO_8601).format(
            "D MMMM YYYY, h:mm A"
          );

          const label = () => {
            let status: string = "";
            let color: string = "";

            switch (data.label) {
              case "healthy":
                status = "Healthy";
                color = "success";
                break;
              case "early_blight":
                status = "Early Blight";
                color = "warning";
                break;
              case "late_blight":
                status = "Late Blight";
                color = "danger";
                break;
              default:
                status = "Unknown";
                color = "secondary";
                break;
            }

            return {
              status,
              color,
            };
          };

          return {
            id: data.id,
            image: data.image,
            imageName,
            label: label(),
            confidence,
            details: data.details,
            uuid: data.uuid,
            created_at: formattedDate,
          };
        };

        diagnose.value = newFormat();
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const getImageName = (imageUrl: string): string => {
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      // Remove any query parameters if present
      return fileName.split("?")[0];
    };

    onMounted(async () => {
      const diagnoseUuid = route.params.diagnoseUuid;

      if (diagnoseUuid) {
        await fetchDiagnoseByUUID(diagnoseUuid);
      } else {
        router.push({ name: "history" });
      }
    });

    return {
      diagnose,
      isLoading,
      getAssetPath,
    };
  },
});
</script>
