<template>
  <VLayout column justify-center>
    <VFlex xs12 sm8 md6 py-3 pl-5>
      <RecycleScroller
        class="scroller"
        :items="titles"
        :item-height="50"
        :prerender="50"
        key-field="title"
        page-mode
      >
        <div class="title" slot-scope="{ item }">
          <NuxtLink :to="'titles/' + item.title">{{ item.title }}</NuxtLink>
        </div>
      </RecycleScroller>
    </VFlex>
  </VLayout>
</template>

<script>
export default {
  async asyncData({ app }) {
    const data = await app.$axios.$get("/json/getTitleArray.php")
    const titles = data.titleArray.filter(title => title.seasonable)
    return { titles }
  }
}
</script>
