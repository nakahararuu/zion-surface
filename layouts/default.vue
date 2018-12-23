<template>
  <VApp dark>
    <VNavigationDrawer
      :mini-variant.sync="miniVariant"
      clipped
      v-model="drawer"
      fixed
      app
    >
      <VList>
        <VListTile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <VListTileAction> <VIcon v-html="item.icon" /> </VListTileAction>
          <VListTileContent>
            <VListTileTitle v-text="item.title" />
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
    <VToolbar fixed app clipped-left>
      <VToolbarSideIcon @click="drawer = !drawer" />
      <VBtn icon @click.stop="miniVariant = !miniVariant">
        <VIcon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </VBtn>
      <VToolbarTitle v-text="title" />
      <VSpacer />
    </VToolbar>
    <VContent>
      <VContainer> <Nuxt /> </VContainer>
    </VContent>
    <VFooter fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </VFooter>
  </VApp>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { icon: "apps", title: "All", to: "/" },
        { icon: "bubble_chart", title: "Recent", to: "/recent" }
      ],
      miniVariant: false,
      title: "ちゃアニ Neo"
    }
  }
}
</script>
