<template>
  <v-layout column>
    <v-flex>
      <div>
        <div
          class="video-player-box"
          @ended="onPlayerEnded($event)"
          @canplay="onPlayerCanplay($event)"
          v-video-player:myVideoPlayer="playerOptions"
        />
      </div>
    </v-flex>

    <v-flex mt-5>
      <v-list>
        <template v-for="(sub, index) in subTitles">
          <v-list-tile :key="index">
            <v-list-tile-action>
              <v-icon v-if="index === playedSubTitleNum"> volume_up </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <nuxt-link
                :to="{ path: `/titles/${title}`, query: { st: index } }"
                replace
              >
                {{ sub }}
              </nuxt-link>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="'divider' + index" />
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    this.playedSubTitleNum = +to.query.st
    this.autoPlay = !!to.query.ap
    next()
  },
  computed: {
    playerOptions() {
      const movieFileName = `${encodeURIComponent(this.subTitles[this.playedSubTitleNum])}.mp4`
      const movieFileUrl = `${this.coreUrl}/movie/${this.title}/${movieFileName}?token=${this.jwt}`

      return {
        preload: 'auto',
        language: 'ja',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: movieFileUrl
          }
        ]
      }
    }
  },
  async asyncData({ params, query, app, env }) {
    const subTitles = await app.$axios.$get('/json/getSubtitleArray.php', {
      params: { title: params.title }
    })

    let playedSubTitleNum = 0
    if (Number(query.st) && subTitles.subtitleArray.length >= +query.st) {
      playedSubTitleNum = +query.st
    }

    return {
      title: params.title,
      playedSubTitleNum,
      subTitles: subTitles.subtitleArray,
      autoPlay: !!query.ap,
      jwt: app.$cookies.get('jwt_token'),
      coreUrl: env.coreUrl
    }
  },
  methods: {
    onPlayerCanplay() {
      if (this.autoPlay) {
        this.myVideoPlayer.play()
      }
    },
    onPlayerEnded() {
      if (this.subTitles.length <= this.playedSubTitleNum) return

      this.$router.replace({
        path: this.$route.path,
        query: { st: ++this.playedSubTitleNum, ap: true }
      })
    }
  }
}
</script>
