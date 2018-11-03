<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <title-tree :titles="titles" @selected-subtitle="navigateTo($event)"></title-tree>
        </v-flex>
    </v-layout>
</template>

<script>
  import TitleTree from '../components/TitleTree'

  export default {
    components: {TitleTree},
    async asyncData ({app}) {
      const data = await app.$axios.$get('/json/getTitleArray.php')
      const titles = data.titleArray.map(title => Object.assign(title, {subTitles: []}))
      return {titles}
    },
    methods: {
      navigateTo: function (event) {
        this.$router.push({
          path: 'video',
          query: {title: event.title.title, subtitle: event.subTitle.title}
        })
      }
    }
  }
</script>
