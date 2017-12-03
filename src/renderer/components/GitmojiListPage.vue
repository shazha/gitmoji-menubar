<template>

  <div class="panel">
    <div class="panel-block">
      <p class="control has-icons-left">
        <input ref="search" class="input is-small" type="text" autofocus placeholder="search" v-model="query" @keydown.enter="onEnter" @keydown.down.prevent="onArrow(1)" @keydown.up.prevent="onArrow(-1)">
        <span class="icon is-small is-left">
          <b-icon pack="fa" icon="search"></b-icon>
        </span>
      </p>
    </div>
    <a v-for="(entry, idx) in visibleEmojis" :key="idx" class="panel-block" :class="{'is-active': selected === idx, 'has-text-weight-semibold': selected === idx }" href="#" @click="copyGitmoji(idx)">
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
      emojiList: [],
      selected: -1
    }
  },
  watch: {
    query: function (newQuery) {
      this.selected = -1
    }
  },
  computed: {
    visibleEmojis () {
      if (!this.query) {
        return this.emojiList
      }
      return this.emojiList.filter(gitmoji => {
        let lowerQuery = this.query.toLowerCase()
        return gitmoji.name.toLowerCase().includes(lowerQuery) || gitmoji.description.toLowerCase().includes(lowerQuery)
      })
    }
  },
  created () {
    this.fetchGitmojis(new Gitmoji(this.$http))
    this.$electron.ipcRenderer.on('after-show', () => {
      this.selected = -1
      process.nextTick(() => {
        this.$refs.search.focus()
      })
    })
  },
  methods: {
    fetchGitmojis (gitmojiApi) {
      gitmojiApi.list()
        .then(res => {
          this.emojiList = res || []
        })
        .catch(err => {
          console.log(err)
        })
    },

    onArrow (step) {
      let newVal = this.selected += step
      if (newVal < 0 || newVal > this.visibleEmojis.length - 1) {
        this.selected = -1
      } else {
        this.selected = newVal
      }
    },

    onEnter () {
      this.copyGitmoji(this.selected)
    },

    copyGitmoji (index) {
      if (index < 0) {
        index = 0
      } else if (index > this.visibleEmojis.length - 1) {
        index = this.visibleEmojis.length - 1
      }
      this.$electron.clipboard.writeText(this.visibleEmojis[index].code)
      this.query = ''
      this.selected = -1
      this.$electron.ipcRenderer.send('hide-gitmoji-window')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
