<template>
    <v-expansion-panel>
        <v-expansion-panel-content v-for="(title, i) in titles" :key="i">
            <div slot="header" @click="fetchSubtitles(title)">{{title.title}}</div>
            <v-flex py-3 pl-5>
                <ul>
                    <li class="subtitle"
                        v-for="subTitle in title.subTitles"
                        @click="$emit('selected-subtitle', {title: title, subTitle:subTitle})"
                    >
                        {{subTitle.title}}
                    </li>
                </ul>
            </v-flex>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style>
    .subtitle {
        cursor: pointer;
        margin: 8px 0;
    }
</style>

<script>
  export default {
    props: ['titles'],
    methods: {
      async fetchSubtitles (title) {
        if (title.subTitles.length) return
        return fetch(`/json/getSubtitleArray.php?title=${title.title}`)
          .then(res => res.json())
          .then(json => json.subtitleArray.map(st => ({title: st})))
          .then(st => (title.subTitles = st))
          .catch(err => console.warn(err))
      }
    }
  }
</script>

