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
      <ul class="unlisted pl-2">
        <li v-for="(sub, index) in subTitles" :key="index">
          <nuxt-link
            :to="{ path: `/titles/${title}`, query: { st: index } }"
            :class="{ 'active-link': index === playedSubTitleNum }"
            replace
          >
            <v-icon class="active-visible">volume_up</v-icon>
            {{ sub }}
          </nuxt-link>
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<style>
:not(.active-link) > .active-visible {
  visibility: hidden;
}
.unlisted {
  list-style: none;
}
</style>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    this.playedSubTitleNum = +to.query.st
    this.autoPlay = !!to.query.ap
    next()
  },
  computed: {
    playerOptions() {
      return {
        preload: 'auto',
        language: 'ja',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: `/movie/${this.title}/${
              this.subTitles[this.playedSubTitleNum]
            }`
          }
        ]
      }
    }
  },
  async asyncData({ params, query, app }) {
    const subTitles = await app.$axios.$get(
      `/json/getSubtitleArray.php?title=${params.title}`
    )

    let playedSubTitleNum = 0
    if (Number(query.st) && subTitles.subtitleArray.length >= +query.st) {
      playedSubTitleNum = +query.st
    }

    return {
      title: params.title,
      playedSubTitleNum,
      subTitles: subTitles.subtitleArray,
      autoPlay: !!query.ap
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
