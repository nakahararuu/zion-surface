<template>
  <div>
    <v-autocomplete
      :items="titles.map(t => t.title)"
      @input="navigateToTitle($event)"
    />
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
                  <nuxt-link
                    :to="{ path: `/titles/${item.title}`, query: { st: 0 } }"
                  >
                    {{ item.title }}
                  </nuxt-link>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
            </template>
          </recycle-scroller>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    const data = await app.$axios.$get('/json/getTitleArray.php')
    return { titles: data.titleArray }
  },
  methods: {
    navigateToTitle: function(event) {
      this.$router.push({ path: `titles/${event}` })
    }
  }
}
</script>
