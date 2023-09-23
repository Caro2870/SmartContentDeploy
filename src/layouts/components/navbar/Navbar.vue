<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <!-- Bookmarks Container -->

    </div>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <notification-dropdown /> -->
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import NotificationDropdown from  "@/layouts/NotificationDropdown.vue";
import UserDropdown from "@/layouts/UserDropdown.vue";

export default {
  components: {
    DarkToggler,
    NotificationDropdown,
    UserDropdown
  },
};
</script>

<style></style>