<template>
  <div ref="dropzoneElement" class="dropzone">
    <div class="dz-message needsclick">
      <i class="ki-duotone ki-file-up text-primary fs-3x">
        <span class="path1"></span>
        <span class="path2"></span>
      </i>
      <div class="ms-4">
        <h3 class="fs-5 fw-bold text-gray-900 mb-1">
          Drop files here or click to upload.
        </h3>
        <span class="fs-7 fw-semibold text-gray-400">Upload only 1 image</span>
      </div>
    </div>
    <input
      type="file"
      id="imageInput"
      name="image"
      accept="image/*"
      style="display: none"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import Dropzone from "dropzone";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "ImageDropzone",
  props: {
    uploadEndpoint: {
      type: String,
      required: true,
    },
  },
  emits: ["fileAdded", "fileRemoved", "uploadSuccess", "uploadError"],
  setup(props, { emit }) {
    const dropzoneElement = ref<HTMLElement | null>(null);
    const dropzoneInstance = ref<Dropzone | null>(null);
    const fileUploaded = ref<File | null>(null);

    const initializeDropzone = () => {
      if (dropzoneElement.value) {
        dropzoneInstance.value = new Dropzone(dropzoneElement.value, {
          url: props.uploadEndpoint,
          maxFiles: 1,
          // only jpeg, jpg, png
          acceptedFiles: "image/jpeg,image/jpg,image/png",
          autoProcessQueue: false,
          createImageThumbnails: true,
          thumbnailWidth: 120,
          thumbnailHeight: 120,
          previewTemplate: `
          <div class="dz-preview dz-file-preview">
            <div class="dz-image"><img data-dz-thumbnail /></div>
            <div class="dz-details">
              <div class="dz-size"><span data-dz-size></span></div>
              <div class="dz-filename"><span data-dz-name></span></div>
            </div>
            <div class="dz-error-message"><span data-dz-errormessage></span></div>
            <div class="dz-success-mark"><span>✔</span></div>
            <div class="dz-error-mark"><span>✘</span></div>
            <div class="dz-remove" data-dz-remove>
              <i class="ki-duotone ki-trash text-danger fs-3x">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
                <span class="path5"></span>
              </i>
            </div>
          </div>
          `,
        });

        dropzoneInstance.value.on("addedfile", (file) => {
          fileUploaded.value = file;
          emit("fileAdded", file);
        });

        dropzoneInstance.value.on("removedfile", () => {
          fileUploaded.value = null;
          emit("fileRemoved");
        });

        dropzoneInstance.value.on("success", (file, response) => {
          emit("uploadSuccess", response);
        });

        dropzoneInstance.value.on("error", (file, errorMessage) => {
          emit("uploadError", errorMessage);
        });
      }
    };

    onMounted(() => {
      initializeDropzone();
    });

    watch(
      () => props.uploadEndpoint,
      (newEndpoint) => {
        if (dropzoneInstance.value) {
          dropzoneInstance.value.options.url = newEndpoint;
        }
      }
    );

    const submitForm = async () => {
      if (dropzoneInstance.value && fileUploaded.value) {
        const formData = new FormData();
        formData.append("image", fileUploaded.value);

        try {
          const response = await ApiService.post(
            props.uploadEndpoint,
            formData
          );
          // emit("uploadSuccess", response.data);
          return response.data;
        } catch (error) {
          console.error("Upload error:", error);
          // emit("uploadError", error);
          return { error };
        }
      }
    };

    const resetForm = () => {
      if (dropzoneInstance.value) {
        dropzoneInstance.value.removeAllFiles();
      }
    };

    return {
      dropzoneElement,
      fileUploaded,
      submitForm,
      resetForm,
    };
  },
});
</script>
