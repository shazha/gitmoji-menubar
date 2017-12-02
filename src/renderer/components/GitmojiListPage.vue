<template>
  <div class="panel">
    <!-- <p class="panel-heading">
      gitmojis
    </p> -->
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="text" autofocus placeholder="search" v-model="query">
        <span class="icon is-small is-left">
          <b-icon pack="fa" icon="search"></b-icon>
        </span>
      </p>
    </div>
    <a v-for="(entry, idx) in list" :key="idx" class="panel-block" @click="copyGitmoji(idx)" v-if="entry.show">
      <span class="panel-icon">
        {{entry.emoji}}
      </span>
      {{entry.description}}
    </a>
  </div>
</template>

<script>
import Gitmoji from '../gitmoji'

export default {
  name: 'gitmoji-list',
  data () {
    return {
      query: '',
      list: []
    }
  },
  watch: {
    query: function (newQuery) {
      this.filterGitemojis()
    }
  },
  created () {
    this.fetchGitemojis(new Gitmoji(this.$http))
  },
  methods: {
    fetchGitemojis (gitmojiApi) {
      gitmojiApi.list()
        .then(res => {
          this.list = res || []
          this.list.forEach(gitmoji => {
            gitmoji.show = true
          })
        })
    },

    filterGitemojis () {
      this.list.forEach(gitmoji => {
        let lowerQuery = this.query.toLowerCase()
        gitmoji.show = gitmoji.name.toLowerCase().includes(lowerQuery) || gitmoji.description.toLowerCase().includes(lowerQuery)
      })
    },

    copyGitmoji (index) {
      this.query = ''
      this.$electron.clipboard.writeText(this.list[index].code)
      this.$electron.remote.app.emit('hide-gitmoji-window')
    }
  }
}
</script>

<style lang="scss" scoped>
// .panel-heading {
//   position: fixed;
//   width: 100%;
//   z-index: 1024;
// }
</style>
