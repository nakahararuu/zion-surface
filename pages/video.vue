<template>
        <div class="video-player-box"
             @ended="onPlayerEnded($event)"
             v-video-player:myVideoPlayer="playerOptions">
        </div>
</template>

<script>
  export default {
    computed: {
      playerOptions: function () {
        return {
          muted: true,
          preload: 'auto',
          language: 'ja',
          fluid: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: 'video/mp4',
            src: `/movie/${this.title}/${this.subTitle}`
          }]
        }
      }
    },
    asyncData (context) {
      return {
        title: context.query['title'],
        subTitle: context.query['subtitle']
      }
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
