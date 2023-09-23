<template>
  <ul>
    <template v-for="item in items">
      <component
        :is="resolveNavItemComponent(item)"
        v-if="showTabNavigation(item)"
        :key="item.header || item.title"
        :item="item"
        :isMouseHovered="isMouseHovered"
        :isVerticalMenuCollapsed="isVerticalMenuCollapsed"
      />
    </template>
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from '@vue/composition-api'
import { mapGetters } from 'vuex'


export default {
  components: {

  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
    }),
  },
  methods: {
    showTabNavigation(item) {
      const { route } = this.$router.resolve({ name: item.route })
      if (route.meta === {}) return true
      if (!route.meta.permittedRoles) return true
      return route.meta.permittedRoles.includes(this.currentUser.role_id)
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    isMouseHovered: {
      type: Boolean,
      required: true,
    },
    isVerticalMenuCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
    }
  },
}
</script>
