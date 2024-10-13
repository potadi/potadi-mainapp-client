<template>
  <div v-if="diagnose?.uuid" class="d-flex flex-column flex-xl-row">
    <div class="flex-column flex-lg-row-auto w-100 w-xl-550px mb-10">
      <ImageWidget :data="diagnose" />
    </div>
    <div class="flex-lg-row-fluid ms-lg-15">
      <ul
        class="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8"
      >
        <li class="nav-item">
          <a
            class="nav-link text-active-primary pb-4 active"
            data-bs-toggle="tab"
            href="#kt_customer_view_overview_tab"
            >Overview</a
          >
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
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
      </div>
    </div>
  </div>

  <StartDiagnoseModal @diagnose-completed="updateDiagnose" />
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDiagnoseStore } from "@/stores/diagnose";
import { getAssetPath } from "@/core/helpers/assets";
import moment from "moment";
import type { IDiagnoses } from "@/core/data/diagnoses";
import DetailWidget from "@/components/widgets/mixed/Widget1.vue";
import ImageWidget from "@/components/widgets/feeds/Widget5.vue";
import StartDiagnoseModal from "@/components/modals/wizards/StartDiagnoseModal.vue";

export default defineComponent({
  name: "diagnose-result",
  components: {
    ImageWidget,
    DetailWidget,
    StartDiagnoseModal,
  },
  setup() {
    const router = useRouter();
    const store = useDiagnoseStore();
    const { selectedDiagnose } = storeToRefs(store);

    const formatDiagnose = (data: IDiagnoses | null): IDiagnoses => {
      const imageName = getImageName(data?.image || "");
      const confidence = data?.confidence;
      const formattedDate = moment(data?.created_at, moment.ISO_8601).format(
        "D MMMM YYYY, h:mm A"
      );

      const label = () => {
        let status: string = "";
        let color: string = "";

        switch (data?.label) {
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

        return { status, color };
      };

      const formattedData = {
        id: data?.id,
        image: data?.image,
        imageName,
        label: label(),
        confidence,
        details: data?.details,
        uuid: data?.uuid,
        created_at: formattedDate,
      };

      return formattedData;
    };

    const getImageName = (imageUrl: string): string => {
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      return fileName.split("?")[0];
    };

    const diagnose = computed(() => {
      if (!selectedDiagnose.value) return {} as IDiagnoses;

      const formatted = formatDiagnose(selectedDiagnose.value);
      return formatted;
    });

    watch(
      () => selectedDiagnose.value,
      (newValue) => {
        if (!newValue?.uuid) {
          router.push({ name: "diagnose" });
        }
      },
      { immediate: true }
    );

    const updateDiagnose = () => {
      // Trigger a re-computation of the diagnose computed property
      store.$patch({ selectedDiagnose: { ...selectedDiagnose.value } });
    };

    return {
      diagnose,
      getAssetPath,
      updateDiagnose,
    };
  },
});
</script>
