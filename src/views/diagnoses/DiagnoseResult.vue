<template>
  <!--begin::Layout-->
  <div class="d-flex flex-column flex-xl-row">
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

  <!--end::Layout-->
</template>

<script lang="ts">
import moment from "moment";
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import DetailWidget from "@/components/widgets/mixed/Widget1.vue";
import ImageWidget from "@/components/widgets/feeds/Widget5.vue";
import type { IDiagnoses } from "@/core/data/diagnoses";
import { useDiagnoseStore } from "@/stores/diagnose";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "diagnose-result",
  components: {
    ImageWidget,
    DetailWidget,
  },
  setup() {
    const router = useRouter();
    const store = useDiagnoseStore();

    const data = computed(() => store.selectedDiagnose);

    const newFormat = (): IDiagnoses => {
      const imageName = getImageName(data.value?.image || "");
      const confidence = data.value?.confidence;
      const formattedDate = moment(
        data.value?.created_at,
        moment.ISO_8601
      ).format("D MMMM YYYY, h:mm A");

      const label = () => {
        let status: string = "";
        let color: string = "";

        switch (data.value?.label) {
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
        id: data.value?.id,
        image: data.value?.image,
        imageName,
        label: label(),
        confidence,
        details: data.value?.details,
        uuid: data.value?.uuid,
        created_at: formattedDate,
      };
    };

    const getImageName = (imageUrl: string): string => {
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      // Remove any query parameters if present
      return fileName.split("?")[0];
    };

    const diagnose = ref<IDiagnoses>(newFormat());

    onMounted(() => {
      if (data.value?.uuid === undefined) {
        router.push({ name: "diagnose" });
      }
    });

    return {
      diagnose,
      getAssetPath,
    };
  },
});
</script>
