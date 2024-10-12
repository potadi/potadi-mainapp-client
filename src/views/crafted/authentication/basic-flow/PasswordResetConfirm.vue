<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPasswordConfirm"
      id="kt_login_password_reset_confirm_form"
      :validation-schema="forgotPasswordConfirm"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Create New Password</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semibold fs-4">
          Make sure it's at least 8 characters including a number, a lowercase
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6"
          >New Password
        </label>
        <Field
          class="form-control form-control-solid"
          type="password"
          placeholder=""
          name="new_password1"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="new_password1" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6"
          >Confirm New Password
        </label>
        <Field
          class="form-control form-control-solid"
          type="password"
          placeholder=""
          name="new_password2"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="new_password2" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link to="/sign-in" class="btn btn-lg btn-light-primary fw-bold"
          >Cancel</router-link
        >
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "password-reset-confirm",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const forgotPasswordConfirm = Yup.object().shape({
      new_password1: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .label("New Password"),
      new_password2: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password1")], "Passwords must match")
        .label("Confirm New Password"),
    });

    //Form submit function
    const onSubmitForgotPasswordConfirm = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // dummy delay
      // Send login request

      const response = await store.forgotPasswordConfirm({
        new_password1: values.new_password1,
        new_password2: values.new_password2,
        uid: route.params.uid as string,
        token: route.params.token as string,
      });

      const error = Object.values(store.errors);

      if (error.length <= 0) {
        Swal.fire({
          text:
            (response?.data.detail as string) ||
            "Your password has been reset successfully!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(() => {
          router.replace({ name: "sign-in" });
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger",
          },
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitForgotPasswordConfirm,
      forgotPasswordConfirm,
      submitButton,
    };
  },
});
</script>
