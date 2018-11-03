<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <title-tree :titles="titles"></title-tree>
        </v-flex>
    </v-layout>
</template>

<script>
  import TitleTree from '../components/TitleTree'

  export default {
    components: {TitleTree},
    async asyncData ({app}) {
      const data = await app.$axios.$get('/json/getTitleArray.php')
      const titles = data.titleArray
        .filter(title => title.seasonable)
        .map(title => Object.assign(title, {subTitles: []}))
      return {titles}
    }
  }
</script>

