<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="saveChanges1"
        :validation-schema="userValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                :style="avatarBackground"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="avatarStyle"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    type="file"
                    name="avatar"
                    accept=".png, .jpg, .jpeg"
                    ref="avatarInput"
                    @change="handleAvatarChange"
                  />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="first_name"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="userData.first_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="first_name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="last_name"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="userData.last_name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="last_name" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6">
              <span>Username</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="username"
                class="form-control form-control-lg form-control-solid"
                placeholder="Username"
                v-model="userData.username"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="username" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <!-- <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button> -->

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Sign-in Method</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">Email Address</div>
            <div class="fs-6 fw-semibold text-gray-600">
              {{ userData.email }}
            </div>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Password</div>
            <div class="fs-6 fw-semibold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semibold text-gray-600 mb-4">
              Password must be at least 8 character and contain symbols
            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Current Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semibold fs-6"
                      name="old_password"
                      id="old_password"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="old_password" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="new_password1"
                      class="form-label fs-6 fw-bold mb-3"
                      >New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semibold fs-6"
                      name="new_password1"
                      id="new_password1"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="new_password1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="new_password2"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirm New Password</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semibold fs-6"
                      name="new_password2"
                      id="new_password2"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="new_password2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Update Password </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Cancel
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
            >
              Reset Password
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->

  <!--begin::Connected Accounts-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_connected_accounts"
      aria-expanded="true"
      aria-controls="kt_account_connected_accounts"
    >
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Connected Accounts</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_connected_accounts" class="collapse show">
      <div class="card-body border-top p-9">
        <div class="py-2">
          <div class="d-flex flex-column flex-sm-row align-items-start gap-4">
            <div class="d-flex flex-grow-1 min-w-0">
              <img
                :src="getAssetPath('media/svg/brand-logos/google-icon.svg')"
                class="w-30px h-30px me-6"
                alt=""
              />
              <div class="d-flex flex-column min-w-0">
                <span class="fs-5 text-dark fw-bold">Google</span>
                <div
                  v-if="!socialAccount.google.is_connected"
                  class="fs-6 fw-semibold text-gray-400"
                >
                  Connect your Google account to sign in faster
                </div>
                <div v-else class="fs-6 fw-semibold text-gray-700">
                  <div
                    v-for="item in socialAccount.google.data"
                    :key="item.id"
                    class="d-flex flex-wrap gap-2 align-items-center mb-2"
                  >
                    <span
                      class="text-truncate flex-grow-1 min-w-0"
                      style="max-width: 300px"
                    >
                      {{ item.email }}
                    </span>
                    <span class="badge bg-success text-white flex-shrink-0">
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column flex-shrink-0">
              <div v-if="!socialAccount.google.is_connected">
                <button
                  type="button"
                  class="btn btn-success text-white"
                  @click="connectGoogle"
                >
                  Connect
                </button>
              </div>
              <div v-else>
                <div
                  v-for="item in socialAccount.google.data"
                  :key="item.id"
                  class="mb-2"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-danger text-white"
                    @click="disconnectGoogle(item.id)"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Content-->
  </div>
  <!--end::Connected Accounts-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { googleSdkLoaded } from "vue3-google-login";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const avatarInput = ref<HTMLInputElement | null>(null);

    const store = useAuthStore();
    const userData = ref({ ...store.user });
    const error = Object.values(store.errors);
    const socialAccount = ref({
      google: {
        is_connected: false,
        data: [] as Array<any>,
      },
    });

    const userValidator = Yup.object().shape({
      first_name: Yup.string().required().label("First name"),
      last_name: Yup.string().required().label("Last name"),
      username: Yup.string().required().label("Username"),
    });

    const avatarBackground = computed(() => ({
      backgroundImage: `url(${getAssetPath("media/avatars/blank.png")})`,
    }));

    const avatarStyle = computed(() => ({
      backgroundImage: `url(${
        userData.value?.avatar
          ? userData.value.avatar
          : getAssetPath("media/avatars/blank.png")
      })`,
    }));

    const saveChanges1 = async (values: any) => {
      if (submitButton1.value) {
        values = values as User;
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");

        const response = await store.updateUserProfile(values);

        userData.value = { ...store.user };

        if (response && error.length <= 0) {
          submitButton1.value?.removeAttribute("data-kt-indicator");
          Swal.fire({
            text: "Profile is successfully updated!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          });
        } else {
          Swal.fire({
            text: error || "Something went wrong!",
            icon: "error",
            confirmButtonText: "Try again!",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
            },
          }).then(() => {
            store.errors = {};
          });
        }
      }
    };

    const changePassword = Yup.object().shape({
      old_password: Yup.string().required().label("Current password"),
      new_password1: Yup.string().min(4).required().label("Password"),
      new_password2: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("new_password1")], "Passwords must match")
        .label("Password Confirmation"),
    });

    const checkGoogleConnection = async () => {
      try {
        const response = await store.checkGoogleConnection();
        socialAccount.value.google.is_connected = response.length > 0;
        socialAccount.value.google.data = response;
      } catch (error) {
        console.log(error);
      }
    };

    const connectGoogle = async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Once connected, you will be able to login with Google.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, connect it!",
        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light-primary",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          googleSdkLoaded((google) => {
            google.accounts.oauth2
              .initCodeClient({
                client_id: import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID,
                scope: "email profile openid",
                redirect_uri: import.meta.env
                  .VITE_APP_GOOGLE_OAUTH_REDIRECT_URL,
                // prompt: "select_account",
                callback: async (response) => {
                  if (response.code) {
                    const res = await store.connectGoogle(response.code);
                    if (res && error.length <= 0) {
                      Swal.fire({
                        text: res.detail as string,
                        icon: "success",
                        confirmButtonText: "Ok",
                        buttonsStyling: false,
                        heightAuto: false,
                        customClass: {
                          confirmButton: "btn btn-light-primary",
                        },
                      }).then(() => {
                        checkGoogleConnection();
                      });
                    } else {
                      Swal.fire({
                        text: "Something went wrong!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Try again!",
                        heightAuto: false,
                        customClass: {
                          confirmButton: "btn fw-semibold btn-light-danger",
                        },
                      });
                    }
                  }
                },
              })
              .requestCode();
          });
        }
      });
    };

    const disconnectGoogle = async (pk: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Once disconnected, you will need to reconnect it again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, disconnect it!",
        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light-primary",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await store.disconnectGoogle(pk);
            if (response && error.length <= 0) {
              Swal.fire({
                text: "Google account is successfully disconnected!",
                icon: "success",
                confirmButtonText: "Ok",
                buttonsStyling: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-primary",
                },
              });
              checkGoogleConnection();
            } else {
              Swal.fire({
                text: "Something went wrong!",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Try again!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semibold btn-light-danger",
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    };

    const deactivateAccount = () => {
      if (submitButton2.value) {
        // Activate indicator
        submitButton2.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton2.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Email is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            emailFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const updatePassword = async (values: any) => {
      values = values as User;

      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        const response = await store.updateUserPassword(values);

        if (response && error.length <= 0) {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");
          Swal.fire({
            text: "Password is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        } else {
          Swal.fire({
            text: error || "Something went wrong!",
            icon: "error",
            confirmButtonText: "Try again!",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
            },
          }).then(() => {
            store.errors = {};
          });
        }
      }
    };

    const removeImage = () => {
      userData.value.avatar = undefined;
      if (avatarInput.value) {
        avatarInput.value.value = "";
      }
    };

    const handleAvatarChange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        try {
          await store.updateUserAvatar(target.files[0]);
          userData.value = store.user ?? {};
          Swal.fire({
            text: "Avatar successfully updated!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          });
        } catch (error) {
          console.error("Failed to upload avatar:", error);
          Swal.fire({
            text: "Failed to upload avatar. Please try again.",
            icon: "error",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          });
        }
      }
    };

    onMounted(() => {
      checkGoogleConnection();
    });

    return {
      submitButton1,
      submitButton2,
      avatarBackground,
      avatarStyle,
      saveChanges1,
      connectGoogle,
      disconnectGoogle,
      deactivateAccount,
      userData,
      socialAccount,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      handleAvatarChange,
      userValidator,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updatePassword,
      getAssetPath,
    };
  },
});
</script>

<style scoped>
.disconnect-btn {
  color: #000;
}

.connect-btn {
  color: #000;
}

.disconnect-btn:hover {
  color: #fff;
}

.connect-btn:hover {
  color: #fff;
}
</style>
