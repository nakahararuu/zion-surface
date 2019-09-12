<template>
  <v-layout column justify-center>
    <v-flex xs12 sm8 md6 py-3>
      <v-list>
        <recycle-scroller
          class="scroller"
          :items="titles"
          :item-height="50"
          :prerender="50"
          key-field="title"
          page-mode
        >
          <template slot-scope="{ item }">
            <v-list-tile>
              <v-list-tile-content>
                <nuxt-link class="title-link"
                  :to="{ path: `/titles/${item.title}`, query: { st: 0 } }"
                >
                  {{ item.title }}
                </nuxt-link>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider :inset="false" />
          </template>
        </recycle-scroller>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<style scoped>
.title-link {
  color: white;
}
</style>

<script>
export default {
  async asyncData({ app }) {
    const data = await app.$axios.$get('/json/getTitleArray.php')
    const titles = data.titleArray.filter(title => title.seasonable)
    return { titles }
  }
}
</script>
