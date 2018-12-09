<template>
    <v-layout column justify-center>
        <v-flex xs12 sm8 md6 py-3 pl-5>
            <RecycleScroller
                    class="scroller"
                    :items="titles"
                    :item-height="50"
                    :prerender=50
                    keyField="title"
                    page-mode
            >
                <div class="title" slot-scope="{ item }">
                    <nuxt-link :to="'titles/' + item.title">{{ item.title }}</nuxt-link>
                </div>
            </RecycleScroller>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    async asyncData ({app}) {
      const data = await app.$axios.$get('/json/getTitleArray.php')
      return {titles: data.titleArray}
    }
  }
</script>
