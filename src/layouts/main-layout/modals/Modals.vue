<template>
  <KTUpgradePlanModal />
  <KTCreateAppModal />
  <KTViewUsersModal />
  <KTInviteFriendsModal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import KTCreateAppModal from "@/components/modals/wizards/create-app-modal/CreateAppModal.vue";
import KTViewUsersModal from "@/components/modals/general/ViewUsersModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";

export default defineComponent({
  name: "global-modals",
  components: {
    KTUpgradePlanModal,
    KTCreateAppModal,
    KTViewUsersModal,
    KTInviteFriendsModal,
  },
});
</script>
