import { ref } from "vue";
import { defineStore } from "pinia";
import type { IDiagnoses } from "@/core/data/diagnoses";

export const useDiagnoseStore = defineStore("diagnose", () => {
  const diagnoses = ref<IDiagnoses[]>([]);
  const selectedDiagnose = ref<IDiagnoses | null>(null);

  function setDiagnoses(newDiagnoses: IDiagnoses[]) {
    diagnoses.value = newDiagnoses;
  }

  function setSelectedDiagnose(diagnose: IDiagnoses) {
    selectedDiagnose.value = diagnose;
  }

  return {
    diagnoses,
    selectedDiagnose,
    setDiagnoses,
    setSelectedDiagnose,
  };
});
