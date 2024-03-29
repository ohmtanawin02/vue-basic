<template>
  <v-app-bar :elevation="1">
    <div class="d-flex justify-start">
      <div class="box-left">
        <img
          src="@/assets/logo-bear.png"
          alt="logo" />
      </div>
      <v-divider
          vertical
          />
      <div class="pl-7 d-flex flex-column justify-center user-select-none background">
        <div class="user-select-none background">{{ title }}</div>
        <v-breadcrumbs
          :items="items"
          class="pl-0"
          divider=">">
        </v-breadcrumbs>
      </div>

      <v-spacer class="background"></v-spacer>

      <div class="d-flex justify-center aling-center background">
        <v-divider
          vertical
          />
        <div class="d-flex flex-column justify-center mx-4">
          <span> {{ userStore.fullName() }} </span>
          <span style="color: #ffffff">{{ userStore.user?.email }}</span>
        </div>
        <div class="d-flex align-center justify-center pr-2">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                small>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="({ title, action }, index) in menuItems"
                :key="index"
                :value="index"
                @click="onMenuAction(action)">
                <v-list-item-title>{{ title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { userStore } from '@/store/user'

export default {
  name: 'HeaderBar',
  data() {
    return {
      items: [],
      menuItems: [
        {
          title: 'Logout',
          action: 'Logout'
        }
      ]
    }
  },
  created() {
    this.handleBreadcrumbs(this.$route.matched)
    this.$watch(
      () => this.$route.params,
      () => {
        this.handleBreadcrumbs(this.$route.matched)
      }
    )
  },
  setup: () => ({
    userStore: userStore()
  }),
  computed: {
    title() {
      return this.$route?.matched[0]?.name || this.$route.name
    }
  },
  methods: {
    handleBreadcrumbs(routes) {
      this.items = routes
        .map((route, index, array) => {
          const text = () => {
            if (typeof route.meta === 'function') {
              return route.meta(this.$route).title
            }
            if (typeof route.meta === 'object' && route.meta.title) {
              return route.meta.title
            }
            return ''
          }
          const to = () => {
            return route?.path.includes(':id')
              ? {
                  name: route.name,
                  params: {
                    id: this.$route.params.id
                  }
                }
              : { name: route.name }
          }
          const disabled = () => {
            const isLast = index === array.length - 1
            const isSame = route?.redirect?.name === this.$route?.name
            return isLast || isSame
          }
          return {
            text: text(),
            title: route.meta.title,
            to: to(),
            disabled: disabled(),
            hideBreadcrumbs: route.meta?.hideBreadcrumbs || undefined
          }
        })
        .filter((route) => route.hideBreadcrumbs !== true)
    },
    onMenuAction(action) {
      switch (action) {
        case 'logout':
          this.$router.push({ name: 'Logout' })
          break
        default:
          console.error('[ERROR] - function onMenuAction case default - action: ', action)
      }
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.v-toolbar__content) {
  display: block;
}
:deep(.v-breadcrumbs-divider) {
  color: #ffffff;
}
.box-left {
  width: 104px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 56px;
    height: 56px;
  }
  background-color:#6E85B7;
}

.background {
  background-color:#6E85B7;
  
}

ul {
  padding: 0;
}
:deep(.v-breadcrumbs-item) {
  padding: 0;
  font-size: 14px;
  color: #999898;
}
:deep(.v-breadcrumbs-item--disabled) {
  color: #ffffff;
  opacity: 1;
}
</style>
