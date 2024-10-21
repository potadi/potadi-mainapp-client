<template>
  <div
    class="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
    data-kt-menu="true"
  >
    <div class="px-7 py-5">
      <div class="fs-5 text-dark fw-bold">Filter Options</div>
    </div>

    <div class="separator border-gray-200"></div>

    <div class="px-7 py-5">
      <div class="mb-10">
        <label class="form-label fw-semibold">Status:</label>
        <div>
          <select
            class="form-select form-select-solid select2-hidden-accessible"
            v-model="data.status"
          >
            <option value="">All</option>
            <option value="healthy">Healthy</option>
            <option value="early_blight">Early Blight</option>
            <option value="late_blight">Late Blight</option>
          </select>
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button
          type="reset"
          class="btn btn-sm btn-light btn-active-light-primary me-2"
          data-kt-menu-dismiss="true"
          @click="resetFilter"
        >
          Reset
        </button>

        <button
          type="submit"
          class="btn btn-sm btn-primary"
          data-kt-menu-dismiss="true"
          @click="applyFilter"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface Filter {
  status: string;
}

export default defineComponent({
  name: "filter-dropdown",
  emits: ["filter-applied", "filter-reset"],
  setup(_, { emit }) {
    const data = ref<Filter>({
      status: "",
    });

    const applyFilter = () => {
      emit("filter-applied", data.value);
    };

    const resetFilter = () => {
      data.value.status = "";
      emit("filter-reset");
    };

    return {
      data,
      applyFilter,
      resetFilter,
    };
  },
});
</script>
