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
          <NuxtLink :to="{ path: `titles/${item.title}`, query: { st: 0 } }">
            {{ item.title }}
          </NuxtLink>
        </div>
      </RecycleScroller>
    </VFlex>
  </VLayout>
</template>

<script>
export default {
  async asyncData({ app }) {
    const data = await app.$axios.$get("/json/getTitleArray.php")
    return { titles: data.titleArray }
  }
}
</script>
