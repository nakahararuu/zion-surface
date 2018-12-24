<template>
  <v-layout column justify-center>
    <v-flex xs12 sm8 md6 py-3 pl-5>
      <recycle-scroller
        class="scroller"
        :items="titles"
        :item-height="50"
        :prerender="50"
        key-field="title"
        page-mode
      >
        <div class="title" slot-scope="{ item }">
          <nuxt-link :to="{ path: `titles/${item.title}`, query: { st: 0 } }">
            {{ item.title }}
          </nuxt-link>
        </div>
      </recycle-scroller>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ app }) {
    const data = await app.$axios.$get('/json/getTitleArray.php')
    return { titles: data.titleArray }
  }
}
</script>
