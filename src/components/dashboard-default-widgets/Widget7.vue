<template>
  <div class="card card-flush" :class="className">
    <!-- Header -->
    <div class="card-header pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">Sample Diseases</span>
        <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >Download the image to try.</span
        >
      </h3>
    </div>

    <!-- Body -->
    <div class="card-body pt-6">
      <!-- Navigation -->
      <ul class="nav nav-pills nav-pills-custom mb-3">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="nav-item mb-3 me-3 me-lg-6"
        >
          <a
            :class="[
              `nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-${item.color} flex-column overflow-hidden w-80px h-85px pt-5 pb-2`,
              { active: i === activeTab },
            ]"
            @click="activeTab = i"
          >
            <div class="nav-icon mb-3">
              <KTIcon :icon-name="item.icon" icon-class="fs-1 p-0" />
            </div>
            <span class="nav-text text-gray-800 fw-bold fs-6 lh-1">
              {{ item.title }}
            </span>
            <span
              class="bullet-custom position-absolute bottom-0 w-100 h-4px"
              :class="`bg-${item.color}`"
            ></span>
          </a>
        </li>
      </ul>

      <div class="separator my-10"></div>

      <!-- Tab Content -->
      <div class="tab-content scrollable-content">
        <div class="card-body pt-0">
          <template v-for="(item, i) in items" :key="i">
            <div v-show="i === activeTab">
              <div
                v-for="(row, j) in item.data"
                :key="j"
                :class="{ 'mb-7': j !== item.data.length - 1 }"
                class="d-flex align-items-sm-center"
              >
                <!-- Symbol -->
                <div class="symbol symbol-60px symbol-2by3 me-4">
                  <div
                    class="symbol-label"
                    :style="{
                      backgroundImage: `url(${row.image})`,
                    }"
                  ></div>
                </div>

                <!-- Title -->
                <div class="d-flex flex-row-fluid flex-wrap align-items-center">
                  <div class="flex-grow-1 me-2">
                    <a
                      href="#"
                      class="text-gray-800 fw-bold text-hover-primary fs-6"
                      >{{ row.name }}</a
                    >
                  </div>

                  <!-- Download Button -->
                  <button
                    @click="downloadImage(row.image, row.name)"
                    class="btn btn-sm btn-light-primary"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "sample-diseases-widget",
  components: {},
  props: {
    className: { type: String, required: false },
  },
  setup() {
    const activeTab = ref(0);

    const items = [
      {
        title: "Healthy",
        icon: "tablet-ok",
        color: "success",
        data: [
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy1.jpg"),
            name: "Healthy 1",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy2.jpg"),
            name: "Healthy 2",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy3.jpg"),
            name: "Healthy 3",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy4.jpg"),
            name: "Healthy 4",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy5.jpg"),
            name: "Healthy 5",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy6.jpg"),
            name: "Healthy 6",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy7.jpg"),
            name: "Healthy 7",
          },
          {
            image: getAssetPath("media/sample_diseases/healthy/healthy8.jpg"),
            name: "Healthy 8",
          },
        ],
      },
      {
        title: "Early Blight",
        icon: "tablet-down",
        color: "warning",
        data: [
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early1.jpg"
            ),
            name: "Early Blight 1",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early2.jpg"
            ),
            name: "Early Blight 2",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early3.jpg"
            ),
            name: "Early Blight 3",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early4.jpg"
            ),
            name: "Early Blight 4",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early5.jpg"
            ),
            name: "Early Blight 5",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early6.jpg"
            ),
            name: "Early Blight 6",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early7.jpg"
            ),
            name: "Early Blight 7",
          },
          {
            image: getAssetPath(
              "media/sample_diseases/early_blight/early8.jpg"
            ),
            name: "Early Blight 8",
          },
        ],
      },
      {
        title: "Late Blight",
        icon: "tablet-delete",
        color: "danger",
        data: [
          {
            image: getAssetPath("media/sample_diseases/late_blight/late1.jpg"),
            name: "Late Blight 1",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late2.jpg"),
            name: "Late Blight 2",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late3.jpg"),
            name: "Late Blight 3",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late4.jpg"),
            name: "Late Blight 4",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late5.jpg"),
            name: "Late Blight 5",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late6.jpg"),
            name: "Late Blight 6",
          },
          {
            image: getAssetPath("media/sample_diseases/late_blight/late7.jpg"),
            name: "Late Blight 7",
          },
        ],
      },
    ];

    const downloadImage = async (imageUrl: string, imageName: string) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = imageName || "image";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
        alert("Gagal mengunduh gambar. Silakan coba lagi nanti.");
      }
    };

    return {
      items,
      activeTab,
      downloadImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.scrollable-content {
  max-height: 400px; /* Adjust this value as needed */
  overflow-y: auto;
  padding-right: 10px; /* Add some padding for the scrollbar */
}

/* Custom scrollbar styles */
.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
