<template>
    <v-layout column>
        <v-flex>
            <div>
                <div class="video-player-box"
                     @ended="onPlayerEnded($event)"
                     v-video-player:myVideoPlayer="playerOptions">
                </div>
            </div>
        </v-flex>
        <v-flex mt-5>
            <ul>
                <li v-for="(sub, index) in subTitles">
                   <nuxt-link :to="`/titles/${title}?st=${index}`">{{ sub }}</nuxt-link>
                </li>
            </ul>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    beforeRouteUpdate (to, from, next) {
      this.playedSubTitleNum = to.query.st
      next()
    },
    computed: {
      playerOptions () {
        return {
          preload: 'auto',
          language: 'ja',
          fluid: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: `/movie/${this.title}/${this.subTitles[this.playedSubTitleNum || 0]}`
          }]
        }
      }
    },
    async asyncData ({params, query, app}) {
      const subTitles = await app.$axios.$get(`/json/getSubtitleArray.php?title=${params.title}`)
      return { title: params.title, playedSubTitleNum: query.st, subTitles: subTitles.subtitleArray }
    },
    mounted () {
      console.log('this is current player instance object', this.myVideoPlayer)
    },
    methods: {
      onPlayerEnded (player) {
        // TODO 次の動画に
      }
    }
  }
</script>
