<template>
<div class="content">
<b-field>
  <label class="checkbox is-size-7">
  <input type="checkbox" v-model="autoLaunch" :disabled="working">
  Launch at Login
</label>
</b-field>
</div>
</template>

<script>
import Preferences from '../../preferences'

export default {
  data () {
    return {
      autoLaunch: false,
      watching: false,
      working: true
    }
  },
  created () {
    this.working = true
    Preferences.isLaunchAtLoginEnabled()
      .then(enabled => {
        this.autoLaunch = enabled
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {
        this.working = false
        this.watching = true
      })
  },
  watch: {
    autoLaunch (newVal) {
      if (this.watching) {
        this.toggleLaunchAtLogin()
      }
    }
  },
  methods: {
    toggleLaunchAtLogin () {
      this.working = true
      Preferences.setLaunchAtLogin(this.autoLaunch)
        .then(success => {
          if (!success) {
            // if failed to set the login item,
            // disable the watcher temporarily and revert the value back
            this.watching = false
            this.autoLaunch = !this.autoLaunch
            process.nextTick(() => {
              this.watching = true
            })
          }
        })
        .catch(err => {
          // no error will be thrown by 'setLaunchAtLogin'
          console.log(err)
        })
        .then(() => {
          this.working = false
        })
    }
  }
}
</script>

