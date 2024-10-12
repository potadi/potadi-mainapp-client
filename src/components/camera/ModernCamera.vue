<script setup lang="ts">
import { useDevicesList, useUserMedia } from "@vueuse/core";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const currentCamera = ref<string>();
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId;
  },
});

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();
const capturedImage = ref<string | null>(null);
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
});

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value!;
});

const captureImage = () => {
  if (video.value && canvas.value) {
    const context = canvas.value.getContext("2d");
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    context?.drawImage(
      video.value,
      0,
      0,
      canvas.value.width,
      canvas.value.height
    );
    capturedImage.value = canvas.value.toDataURL("image/jpeg");
  }
};

const retakePhoto = () => {
  capturedImage.value = null;
};

defineExpose({ capturedImage });
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="mb-4">
        <div class="d-flex justify-content-center mb-4">
          <button
            @click="enabled = !enabled"
            class="btn"
            :class="!enabled ? 'btn-primary' : 'btn-danger'"
          >
            {{ enabled ? t("buttonDisableCamera") : t("buttonEnableCamera") }}
          </button>
        </div>

        <div class="mb-3">
          <label class="form-label">{{ t("buttonChooseCamera") }}:</label>
          <select v-model="currentCamera" class="form-select">
            <option
              v-for="camera of cameras"
              :key="camera.deviceId"
              :value="camera.deviceId"
            >
              {{ camera.label }}
            </option>
          </select>
        </div>
        <video
          v-if="!capturedImage"
          ref="video"
          muted
          autoplay
          class="w-100 h-auto rounded"
          :class="{ 'd-none': !enabled }"
        />
        <img
          v-else
          :src="capturedImage"
          alt="Captured"
          class="w-100 h-auto rounded"
        />
        <canvas ref="canvas" class="d-none"></canvas>
        <div
          v-if="!enabled && !capturedImage"
          class="bg-light d-flex align-items-center justify-content-center rounded"
          style="height: 300px"
        >
          <span class="text-muted">
            <i class="bi bi-camera-video-off" style="font-size: 3rem"></i>
          </span>
        </div>
        <div v-if="enabled" class="d-flex justify-content-center mt-4">
          <button
            v-if="!capturedImage"
            @click="captureImage()"
            class="btn btn-primary me-2"
          >
            {{ t("buttonTakePicture") }}
          </button>
          <button
            v-if="capturedImage"
            @click="retakePhoto"
            class="btn btn-secondary"
          >
            {{ t("buttonRetakePicture") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
