<template>
  <div>
    <div
      no-body
      class="cardClass"
    >
      <b-sidebar
        id="sidebar-right"
        right
        backdrop
        bg-variant="white"
        sidebar-class="sidebar-lg"
        header-class="pt-1"
        :no-close-on-backdrop="backdropClose"
        :no-close-on-esc="backdropClose"
        lazy
      >
        <template #header>
          <div class="d-flex justify-content-between align-items-center w-100">
            <span>
              <h3>Busqueda avanzada</h3>
            </span>
            <span
              v-b-toggle.sidebar-right
              class="cursor-pointer"
            >
              <!--              <tabler-icon icon="XIcon" size="20" />-->
            </span>
          </div>
        </template>
        <b-container>
          <filters-component
            :filters="filter"
            @onSelectChange="emitEvent"
          >
            <template #custom-select>
              <slot name="custom-vselect" />
            </template>
          </filters-component>
        </b-container>
        <template #footer>
          <b-container>
            <b-row class="d-flex p-1 float-right">
              <b-button
                variant="info"
                @click="resetFiltersButtons"
              >Deshacer cambios</b-button>
              <b-button
                v-b-toggle.sidebar-right
                variant="primary"
                class="ml-1"
                @click="sideBarSearch"
              >Buscar</b-button>
            </b-row>
          </b-container>
        </template>
      </b-sidebar>
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">
              Mostrando {{ startPage }} a {{ toPage }} de {{ totalRows }} registros
            </span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end pagination_1"
          >
            <slot name="pagination">
              <b-pagination
                v-model="paginate.currentPage"
                :total-rows="totalRows"
                :per-page="paginate.perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                @input="$emit('onChangeCurrentPage', $event)"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </slot>
          </b-col>
        </b-row>
      </div>
      <slot name="recovery-list" />
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            :md="changeColumnsByClient == true ? 8 : 6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Mostrar</label>
            <v-select
              v-model="paginate.perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="[10, 25, 50, 100]"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
              @input="$emit('reload', false)"
            />
            <label class="mr-2">registros</label>
            <feather-icon
              :badge="codeIcon?counterNewClaim:0"
              badge-classes="bg-danger blink"
              class="cursor-pointer"
              icon="RefreshCcwIcon"
              size="20"
              @click="resetFilter"
            />
            <slot name="buttons" />
          </b-col>
          <!-- Search -->
          <b-col
            cols="12"
            :md="changeColumnsByClient == true ? 4 : 6"
          >
            <div
              class="d-flex align-items-center justify-content-end align-items-center"
            >
              <slot name="buttons-filter" />
              <b-input-group
                v-if="!noVisiblePrincipalFilter"
                class="mr-1"
              >
                <b-form-input
                  v-if="filterPrincipal.type === 'input'"
                  v-model="filterPrincipal.model"
                  :type="filterPrincipal.inputType"
                  :placeholder="filterPrincipal.placeholder"
                  :class="filterPrincipal.class"
                  @keyup.enter="$emit('reload')"
                />
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    @click="$emit('reload')"
                  >
                    <feather-icon icon="SearchIcon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <b-button
                v-if="hasFilters"
                v-b-toggle.sidebar-right
                v-b-tooltip.bottom="'Advanced Search'"
                variant="primary"
              >
                <div class="d-flex justify-content-between">
                  <feather-icon
                    icon="FilterIcon"
                    size="15"
                  />
                </div>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>
      <div>
        <slot name="table" />
      </div>
      <div
        v-if="doublePaginate"
        class="mx-2 mb-2 mt-2"
      >
        <b-row>
          <b-col
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">
              Mostrando {{ startPage }} a {{ toPage }} de {{ totalRows }} registros
            </span>
          </b-col>
          <!-- Pagination -->
          <slot name="footer" />
          <b-col
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <slot name="pagination">
              <b-pagination
                v-model="paginate.currentPage"
                :total-rows="totalRows"
                :per-page="paginate.perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
              >
                <template #prev-text>
                  <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                  />
                </template>
                <template #next-text>
                  <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                  />
                </template>
              </b-pagination>
            </slot>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';

export default {
  name: 'SalesMadeNewClientComponent',
  components: {
    vSelect,
  },
  props: {
    changeColumnsByClient: { required: false, type: Boolean },
    filter: { required: true, type: Array, default: () => [] },
    totalRows: { required: false, type: Number },
    paginate: { required: true, type: Object },
    startPage: { required: false, type: Number },
    toPage: { required: false, type: Number },
    filterPrincipal: { required: false, type: Object },
    noVisiblePrincipalFilter: { required: false, default: false },
    cardClass: { required: false, type: String, default: 'mb-1 border-0 p-0' },
    backdropClose: { required: false, default: false },
    doublePaginate: { required: false, type: Boolean, default: true },
  },
  data() {
    return {
      counterNewClaim: 0,
    };
  },
  computed: {
    ...mapGetters({
      skin: 'appConfig/skin',
      S_DATA_UPDATE_CLAIM: 'global-store/G_DATA_UPDATE_CLAIM',
      currentUser: 'auth/currentUser',
    }),
    ...mapState({
      perPage: state => state.appConfig.perPage,
    }),
    hasFilters() {
      return this.filter ? Object.keys(this.filter).length !== 0 : false;
    },
    codeIcon() {
      return this.$route.meta.pageCodeIcon == 'workers_claim';
    },
  },
  watch: {
    perPage(newVal) {
      console.log('caro');
      this.paginate.perPage = newVal;
      this.$emit('reload');
    },

  },
  created() {
    if (this.filter) {
      this.filter.map(fil => {
        if (fil.type === 'input-money') {
          fil.model = 0.0;
        } else {
          fil.model = null;
        }
        fil.savedValue = null;
        fil.showText = 'Select';
      });
    }
    this.filterPrincipal.model = '';
  },
  mounted() {
    this.paginate.perPage = this.perPage;
    this.$emit('reload');
  },
  methods: {
    resetFiltersButtons() {
      if (this.filter) {
        this.filter.map(fil => {
          if (fil.type === 'input-money') {
            fil.model = 0.0;
          } else {
            fil.model = null;
          }
          fil.savedValue = null;
          fil.showText = 'Select';
        });
      }
      this.$emit('reset-all-filters');
    },
    resetFilter() {
      if (this.filter) {
        this.filter.map(fil => {
          if (fil.type === 'input-money') {
            fil.model = 0.0;
          } else {
            fil.model = null;
          }
        });
        this.counterNewClaim = 0;
      }
      this.filterPrincipal.model = '';
      this.$emit('reload');
    },
    sideBarSearch() {
      this.filterPrincipal.model = '';
      this.$emit('reload');
    },
    emitEvent(type) {
      this.$emit('onSelectChange', type);
    },
  },

};
</script>

<style lang="scss" scoped>
.flexible {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
}
.per-page-selector {
  width: 90px;
}
td.div {
  width: 100% !important;
}
.hover-close {
  transition: 300ms;
}
.hover-close:hover {
  background-color: #ff3b19 !important;
  color: white !important;
}
@media (max-width: 960px) {
  .column-table {
    display: flex;
    flex-direction: column;
  }
}
.blink {
  animation: animationBlink 1s ease-in-out infinite;
}
.blink:hover {
  animation: none;
}
@keyframes animationBlink {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
