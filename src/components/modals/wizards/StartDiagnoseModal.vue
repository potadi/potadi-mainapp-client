<template>
  <!--begin::Modal - Two-factor authentication-->
  <div
    class="modal fade"
    id="kt_modal_start_diagnose"
    ref="diagnoseModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <!--begin::Modal header-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header flex-stack">
          <!--begin::Title-->
          <h2>{{ t("modalHeaderUploadOption") }}</h2>
          <!--end::Title-->

          <!--begin::Close-->
          <div
            v-if="!isSubmitting"
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y pt-10 pb-15 px-lg-17">
          <!--begin::Options-->
          <div :class="[state !== '' && 'd-none']">
            <!--begin::Notice-->
            <p class="text-gray-400 fs-5 fw-semibold mb-10">
              {{ t("modalNoticeBodyUploadOption") }}
            </p>
            <!--end::Notice-->

            <!--begin::Wrapper-->
            <div class="pb-10">
              <!--begin::Option-->
              <input
                type="radio"
                class="btn-check"
                name="auth_option"
                value="uploadImg"
                checked
                id="kt_modal_start_diagnose_option_1"
                v-model="value"
              />
              <label
                class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-5"
                for="kt_modal_start_diagnose_option_1"
              >
                <KTIcon icon-name="file-up" icon-class="fs-4x me-4" />

                <span class="d-block fw-semibold text-start">
                  <span class="text-dark fw-bold d-block fs-3">
                    {{ t("modalBodyUploadOption1") }}</span
                  >
                  <span class="text-gray-400 fw-semibold fs-6">
                    {{ t("modalTextBodyUploadOption1") }}
                  </span>
                </span>
              </label>
              <!--end::Option-->

              <!--begin::Option-->
              <input
                type="radio"
                class="btn-check"
                name="auth_option"
                value="captureImg"
                id="kt_modal_start_diagnose_option_2"
                v-model="value"
              />
              <label
                class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
                for="kt_modal_start_diagnose_option_2"
              >
                <KTIcon icon-name="monitor-mobile" icon-class="fs-4x me-4" />

                <span class="d-block fw-semibold text-start">
                  <span class="text-dark fw-bold d-block fs-3">
                    {{ t("modalBodyUploadOption2") }}
                  </span>
                  <span class="text-gray-400 fw-semibold fs-6">
                    {{ t("modalTextBodyUploadOption2") }}
                  </span>
                </span>
              </label>
              <!--end::Option-->
            </div>
            <!--end::Options-->

            <!--begin::Action-->
            <button @click="state = value" class="btn btn-primary w-100">
              Continue
            </button>
            <!--end::Action-->
          </div>
          <!--end::Options-->

          <!--begin::Upload Image-->
          <div
            :class="[state !== 'uploadImg' && 'd-none']"
            data-kt-element="uploadImg"
          >
            <!--begin::Heading-->
            <h3 class="text-dark fw-bold mb-7">
              {{ t("modalBodyUploadOption1") }}
            </h3>
            <!--end::Heading-->

            <!--begin::Description-->
            <div class="text-gray-500 fw-semibold fs-6 mb-10">
              {{ t("descriptionOption1") }}
            </div>
            <!--end::Description-->

            <!--begin::Form-->
            <div class="mb-10 fv-row">
              <ImageDropzone
                ref="dropzoneRef"
                :uploadEndpoint="uploadURI"
                @fileAdded="handleFileAdded"
                @fileRemoved="handleFileRemoved"
                @uploadSuccess="handleUploadSuccess"
                @uploadError="handleUploadError"
              />
            </div>
            <div
              class="d-flex flex-center"
              role="group"
              aria-label="Form actions"
            >
              <button
                type="reset"
                @click="resetForm()"
                class="btn btn-light me-3"
                :disabled="isSubmitting"
              >
                Cancel
              </button>
              <button
                ref="submitAuthCodeButtonRef"
                type="submit"
                @click="submitImageForm()"
                class="btn btn-primary"
                :disabled="!hasFile || isSubmitting"
                aria-live="polite"
              >
                <span class="indicator-label"> Submit </span>
                <span class="indicator-progress"
                  >Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                    aria-hidden="true"
                  ></span
                ></span>
              </button>
            </div>
            <!--end::Form-->
          </div>
          <!--end::Options-->

          <!--begin::Capture Image-->
          <div
            :class="[state !== 'captureImg' && 'd-none']"
            data-kt-element="captureImg"
          >
            <!--begin::Heading-->
            <h3 class="text-dark fw-bold fs-3 mb-5">
              {{ t("modalBodyUploadOption2") }}
            </h3>
            <!--end::Heading-->

            <!--begin::Notice-->
            <div class="text-gray-400 fw-semibold mb-10">
              {{ t("descriptionOption2") }}
            </div>
            <!--end::Notice-->

            <!--begin::Form-->

            <!--begin::Input group-->
            <div class="mb-10 fv-row">
              <ModernCamera ref="cameraRef" />
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div
              class="d-flex flex-center"
              role="group"
              aria-label="Form actions"
            >
              <button
                type="reset"
                @click="state = ''"
                class="btn btn-light me-3"
                :disabled="isSubmitting"
              >
                Cancel
              </button>

              <button
                ref="submitMobileButtonRef"
                type="submit"
                class="btn btn-primary"
                @click="submitCapturedImage()"
                :disabled="isSubmitting"
                aria-live="polite"
              >
                <span class="indicator-label"> Submit </span>
                <span class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                    aria-hidden="true"
                  ></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->

            <!--end::Form-->
          </div>
          <!--end::Capture Image-->
        </div>
        <!--begin::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal header-->
  </div>
  <!--end::Modal - Two-factor authentication-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";
import ImageDropzone from "@/components/dropzone/ImageDropzone.vue";
import { useRouter } from "vue-router";
import { useDiagnoseStore } from "@/stores/diagnose";
import { hideModal } from "@/core/helpers/dom";
import ModernCamera from "@/components/camera/ModernCamera.vue";
import ApiServices from "@/core/services/ApiService";
import { Detection } from "@/core/services/ObjectDetection";

export default defineComponent({
  name: "start-diagnose-modal",
  components: {
    ImageDropzone,
    ModernCamera,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const value = ref("uploadImg");
    const isSubmitting = ref(false);

    const state = ref("");
    const store = useDiagnoseStore();

    const setButtonState = (buttonRef, disabled, indicator = false) => {
      if (buttonRef.value) {
        buttonRef.value.disabled = disabled;
        buttonRef.value[indicator ? "setAttribute" : "removeAttribute"](
          "data-kt-indicator",
          "on"
        );
      }
    };

    const showErrorAlert = (text) => {
      Swal.fire({
        text,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: { confirmButton: "btn btn-primary" },
      });
    };

    const submitAuthCodeButtonRef = ref<null | HTMLButtonElement>(null);
    const submitMobileButtonRef = ref<null | HTMLButtonElement>(null);

    const diagnoseModalRef = ref<null | HTMLElement>(null);
    const dropzoneRef = ref<InstanceType<typeof ImageDropzone> | null>(null);
    const uploadURI = ref(`${import.meta.env.VITE_APP_API_URL}/diagnose/`);
    const hasFile = ref(false);

    const handleFileAdded = () => {
      hasFile.value = true;
    };

    const handleFileRemoved = () => {
      hasFile.value = false;
    };

    const handleUploadSuccess = (response: any) => {
      console.log("Upload berhasil:", response);
      isSubmitting.value = false;
    };

    const handleUploadError = (error: any) => {
      console.error("Upload gagal:", error);
      isSubmitting.value = false;
    };

    const resetForm = () => {
      if (dropzoneRef.value) {
        dropzoneRef.value.resetForm();
      }
      state.value = "";
    };

    const submitImageForm = async () => {
      if (!submitAuthCodeButtonRef.value || !dropzoneRef.value) return;

      setButtonState(submitAuthCodeButtonRef, true, true);
      isSubmitting.value = true;

      try {
        const detect = await Detection(dropzoneRef.value.fileUploaded);
        const confidence = detect.predictions[0]?.confidence.toFixed(2);

        if (confidence >= 0.78) {
          const response = await dropzoneRef.value.submitForm();
          if (response) {
            store.setSelectedDiagnose(response);
            hideModal(diagnoseModalRef.value);
            router.replace({ name: "diagnose-result" });
            return;
          }
        }
        showErrorAlert("The image is not clear enough. Please try again.");
      } catch (error) {
        showErrorAlert("Error uploading image.");
      } finally {
        setButtonState(submitAuthCodeButtonRef, false);
        isSubmitting.value = false;
      }
    };

    const cameraRef = ref<InstanceType<typeof ModernCamera> | null>(null);

    const submitCapturedImage = async () => {
      if (!cameraRef.value?.capturedImage) {
        showErrorAlert("Please capture an image first.");
        return;
      }

      setButtonState(submitMobileButtonRef, true, true);
      isSubmitting.value = true;

      try {
        const base64Response = await fetch(cameraRef.value.capturedImage);
        const blob = await base64Response.blob();

        const formData = new FormData();
        formData.append("image", blob, "captured_image.jpg");

        const detect = await Detection(formData.get("image"));
        const confidence = detect.predictions[0]?.confidence.toFixed(2);

        if (confidence >= 0.78) {
          const response = await ApiServices.post("diagnose/", formData);
          if (response.status === 201) {
            store.setSelectedDiagnose(response.data);
            hideModal(diagnoseModalRef.value);
            router.replace({ name: "diagnose-result" });
            return;
          }
        }
        showErrorAlert("The image is not clear enough. Please try again.");
      } catch (error) {
        showErrorAlert("Error uploading image.");
      } finally {
        setButtonState(submitMobileButtonRef, false);
        isSubmitting.value = false;
      }
    };

    return {
      t,
      diagnoseModalRef,
      value,
      state,
      dropzoneRef,
      uploadURI,
      hasFile,
      isSubmitting,
      handleFileAdded,
      handleFileRemoved,
      handleUploadSuccess,
      handleUploadError,
      resetForm,
      submitImageForm,
      submitCapturedImage,
      submitAuthCodeButtonRef,
      submitMobileButtonRef,
      cameraRef,
      getAssetPath,
    };
  },
});
</script>
