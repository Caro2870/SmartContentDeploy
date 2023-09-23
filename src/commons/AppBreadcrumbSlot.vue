<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col
      class="content-header-left mb-2 d-sm-block d-block"
      cols="10"
      :md="
        chargeBack
          ? '6'
          : clientsSearch == true
          ? globalSearch
            ? '6'
            : '3'
          : '9'
      "
    >
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item
                :to="subModules.includes(moduleId) ? '/cedigital' : '/'"
              >
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none"
      :class="{'mb-2': !noBorderBottom}"
      :md="
        chargeBack
          ? '6'
          : clientsSearch == true
          ? globalSearch
            ? '6'
            : '9'
          : globalSearch
          ? '6'
          : '3'
      "
      sm="10"
      cols="12"
    >
      <slot name="actions" />
    </b-col>
  <!-- Content Dropdown -->
    <b-col
      v-if="$slots.actionsDropdown"
      cols="2"
      class="d-sm-block content-header-right d-md-none d-lg-none d-xl-none d-block pl-0"
    >
      <b-dropdown
        variant="outline-success"
        dropleft
        text="asd"
        class="dropCustom"
      >
      <template #button-content>
        <feather-icon icon="ChevronLeftIcon"></feather-icon>
      </template>
        <slot name="actionsDropdown" />
      </b-dropdown>
    </b-col>
  <!-- Content Buttons -->
    <b-col
      v-if="$slots.actionsButtons"
      cols="2"
      class="d-sm-block content-header-right d-md-none d-lg-none d-xl-none d-block pl-0 mb-2"
    >
        <slot name="actionsButtons" />
    </b-col>
  </b-row>
</template>
<style>
.dropCustom .dropdown-toggle::before{
  display: none!important;
  background-image: none!important
}
</style>
<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
  },
  props: {
    clientsSearch: {
      type: Boolean,
    },
    chargeBack: {
      type: Boolean,
    },
    globalSearch: {
      type: Boolean,
    },
    noBorderBottom: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  data() {
    return {

      subModules: [],
    };
  },
  computed: {
    moduleId() {
      return this.$route.matched[0].meta.module;
    },
  },
  created() {
    this.subModules = [22, 23, 24, 26];
  },
};
</script>
