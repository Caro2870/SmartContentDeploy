import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import FilterComponent from "@/commons/FiltersComponent.vue";
import FilterSlot from "@/commons/FilterSlot.vue";
import HeaderSlot from "@/commons/AppBreadcrumbSlot.vue";

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component("filters-component", FilterComponent);
Vue.component("filter-slot", FilterSlot);
Vue.component("header-slot", HeaderSlot);
