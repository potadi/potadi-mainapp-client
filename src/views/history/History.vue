<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Data"
          />
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <KTIcon icon-name="exit-up" icon-class="fs-2" />
            Export
          </button>
          <!--end::Export-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button type="button" class="btn btn-danger" @click="deleteFewData()">
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="true"
        checkbox-label="id"
      >
        <template v-slot:image="{ row: diagnose }">
          <img
            :src="diagnose.image"
            class="w-50px h-50px rounded"
            alt=""
            loading="lazy"
          />
        </template>
        <template v-slot:imageName="{ row: diagnose }">
          <div class="text-gray-800 text-hover-primary mb-1">
            {{ diagnose.imageName }}
          </div>
        </template>
        <template v-slot:label="{ row: diagnose }">
          <div class="text-gray-600 text-hover-primary mb-1">
            <div :class="`badge badge-light-${diagnose.label.color}`">
              {{ diagnose.label.status }}
            </div>
          </div>
        </template>
        <template v-slot:confidence="{ row: diagnose }">
          {{ diagnose.confidence }}%
        </template>
        <template v-slot:created_at="{ row: diagnose }">
          {{ diagnose.created_at }}
        </template>
        <template v-slot:actions="{ row: diagnose }">
          <div v-memo="[diagnose.id]">
            <div
              class="btn btn-sm btn-light btn-active-light-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              Actions
              <KTIcon icon-name="down" icon-class="fs-5 m-0" />
            </div>
            <!--begin::Menu-->
            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
              data-kt-menu="true"
            >
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <router-link
                  :to="{
                    name: 'history-detail',
                    params: { diagnoseUuid: diagnose.uuid },
                  }"
                  class="menu-link px-3"
                >
                  View
                </router-link>
              </div>
              <!--end::Menu item-->
              <!--begin::Menu item-->
              <div class="menu-item px-3">
                <a @click="deleteCustomer(diagnose.id)" class="menu-link px-3"
                  >Delete</a
                >
              </div>
              <!--end::Menu item-->
            </div>
            <!--end::Menu-->
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { MenuComponent } from "@/assets/ts/components";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import type { IDiagnoses } from "@/core/data/diagnoses";
import ApiService from "@/core/services/ApiService";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import moment from "moment";

export default defineComponent({
  name: "history-page",
  components: {
    Datatable,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Image",
        columnLabel: "image",
        sortEnabled: false,
        columnWidth: 125,
      },
      {
        columnName: "Name",
        columnLabel: "imageName",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Data Taken",
        columnLabel: "created_at",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Status",
        columnLabel: "label",
        sortEnabled: true,
        columnWidth: 175,
      },
      {
        columnName: "Precentage",
        columnLabel: "confidence",
        sortEnabled: true,
        columnWidth: 225,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref<Array<number>>([]);

    const tableData = ref<Array<IDiagnoses>>([]);
    const initDiagnoses = ref<Array<IDiagnoses>>([]);

    const initializeMenu = () => {
      nextTick(() => {
        MenuComponent.reinitialization();
      });
    };

    const getImageName = (imageUrl: string): string => {
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      // Remove any query parameters if present
      return fileName.split("?")[0];
    };

    const deleteFewData = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-active-light-primary",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await Promise.all(
              selectedIds.value.map(async (id) => {
                const response = await ApiService.delete(`/diagnose/${id}/`);
                if (response.status === 204) {
                  const index = tableData.value.findIndex(
                    (item) => item.id === id
                  );
                  if (index !== -1) {
                    tableData.value.splice(index, 1);
                  }
                }
              })
            );
            MenuComponent.reinitialization();
            Swal.fire("Deleted!", "Your files have been deleted.", "success");
          } catch (error) {
            Swal.fire("Error!", "Something went wrong", "error");
          }
        }
      });
    };

    const deleteCustomer = async (id: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-active-light-primary",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await ApiService.delete(`/diagnose/${id}/`);
            if (response.status === 204) {
              const index = tableData.value.findIndex((item) => item.id === id);
              tableData.value.splice(index, 1);
              MenuComponent.reinitialization();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          } catch (error) {
            Swal.fire("Error!", "Something went wrong", "error");
          }
        }
      });
    };

    const search = ref<string>("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initDiagnoses.value);
      if (search.value !== "") {
        let results: Array<IDiagnoses> = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (typeof obj[key] !== "object" && typeof obj[key] !== "number") {
          if (
            obj[key].toString().toLowerCase().indexOf(value.toLowerCase()) != -1
          ) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    onMounted(async () => {
      const res = await ApiService.get("/diagnose");
      if (res.status === 200) {
        const newFormat = res.data.results.map((item) => {
          const imageName = getImageName(item.image);
          const confidence = item.confidence;
          const formattedDate = moment(item.created_at, moment.ISO_8601).format(
            "D MMMM YYYY, h:mm A"
          );

          const label = () => {
            let color: string = "";

            switch (item.label) {
              case "healthy":
                color = "success";
                break;
              case "early_blight":
                color = "warning";
                break;
              case "late_blight":
                color = "danger";
                break;
              default:
                color = "secondary";
                break;
            }

            return {
              status: item.label.replace("_", " ").toUpperCase(),
              color,
            };
          };

          return {
            id: item.id,
            image: item.image,
            imageName,
            label: label(),
            confidence,
            uuid: item.uuid,
            created_at: formattedDate,
          };
        });
        tableData.value = newFormat;
        initDiagnoses.value = [...tableData.value];
      }
      initializeMenu();
    });

    return {
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewData,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>
