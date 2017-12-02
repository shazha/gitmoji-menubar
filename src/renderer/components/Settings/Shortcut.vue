<template>
<div class="content">
<b-field>
  <label class="label is-unselectable">Global Shortcut</label>
        <div v-if="shortcutDefined || recording" class="control tags has-addons">
          <span class="tag">
            <span class="shortcut-key is-unselectable" :class="{'has-text-grey-light': !shortcut.shift, 'has-text-primary': shortcut.shift}" aria-label="Shift" title="Shift">&#8679;</span>
          <span class="shortcut-key is-unselectable" :class="{'has-text-grey-light': !shortcut.alt, 'has-text-primary': shortcut.alt}" aria-label="Alt" title="Alt">&#8997;</span>
          <span class="shortcut-key is-unselectable" :class="{'has-text-grey-light': !shortcut.meta, 'has-text-primary': shortcut.meta}" v-if="isMac" aria-label="Command key" title="Command key">&#8984;</span>
          <span class="shortcut-key is-unselectable" :class="{'has-text-grey-light': !shortcut.meta, 'has-text-primary': shortcut.meta}" v-else aria-label="Windows key" title="Windows key">⊞</span>
          <span class="shortcut-key is-unselectable" :class="{'has-text-grey-light': !shortcut.ctrl, 'has-text-primary': shortcut.ctrl}" aria-label="Ctrl" title="Ctrl">^</span>
          <span class="shortcut-key is-unselectable" :class="{'has-text-primary': shortcut.char}">{{shortcut.char || '&nbsp;'}}</span>
          </span>
          <a v-if="recording && !shortcutDefined" class="tag" href="#" @click="cancelRecording" aria-label="cancel" title="cancel">&#9099;</a>
          <a v-else class="tag is-delete" href="#" @click="removeShortcut" title="unregister the shortcut"></a>
        </div>
        <a v-else class="control tag" href="#" @click="recordSequence">Record Shortcut</a>
  </b-field>
</div>
</template>

<script>
import Mousetrap from 'mousetrap'
// eslint-disable-next-line
import MousetrapRecorder from 'mousetrap/plugins/record/mousetrap-record'
import Preferences from '../../preferences'

export default {
  data () {
    return {
      isMac: process.platform === 'darwin',
      shortcut: {
        char: '',
        ctrl: false,
        shift: false,
        alt: false,
        meta: false
      },
      recording: false
    }
  },
  computed: {
    shortcutDefined () {
      return this.shortcut && (this.shortcut.ctrl || this.shortcut.shift || this.shortcut.alt || this.shortcut.meta || this.shortcut.char)
    }
  },
  created () {
    this.shortcut = Preferences.getGlobalShortcut()
  },
  methods: {
    recordSequence () {
      this.recording = true
      var self = this
      Mousetrap.record({recordSequence: false}, function (sequence) {
        self.recording = false
        if (sequence && Array.isArray(sequence) && sequence.length > 0) {
          let keys = sequence[0].split('+')
          console.log(keys)
          keys.forEach(key => {
            switch (key) {
              case 'ctrl':
                self.shortcut.ctrl = true
                break
              case 'shift':
                self.shortcut.shift = true
                break
              case 'alt':
                self.shortcut.alt = true
                break
              case 'meta':
                self.shortcut.meta = true
                break
              default:
                self.shortcut.char = key.toUpperCase()
                break
            }
          })
          console.log(self.shortcut)
          self.setShortcut()
        }
      })
    },

    cancelRecording () {
      Mousetrap.stopRecord()
      this.recording = false
    },

    removeShortcut () {
      this.shortcut.char = ''
      this.shortcut.ctrl = false
      this.shortcut.shift = false
      this.shortcut.alt = false
      this.shortcut.meta = false
      this.setShortcut()
    },

    setShortcut () {
      Preferences.setGlobalShortcut(this.shortcut)
        .then(success => {
          if (success) {
            this.$electron.remote.app.emit('global-shortcut-updated', this.shortcut)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.shortcut-key {
  padding: 0 2px;
}
.content label {
  padding-right: 10px;
  margin-top: 0.25rem;
}
</style>

