<template>
<div>
  <section class="hero is-primary is-medium app-navbar">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <span class="navbar-item is-size-6 has-text-white">
              gitmoji menu
            </span>
            <div class="navbar-item settings-menu">
              <a class="tag is-white is-rounded" @click="showSettings=true" title="Settings">
              <b-icon pack="fa" size="is-small" icon="gear" type="is-primary" custom-size="fa-lg"></b-icon>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
  <div class="modal" :class="{'is-active':showSettings}">
  <div class="modal-background" @click="showSettings = false"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Settings</p>
      <button class="delete" aria-label="close" href="#" @click="showSettings = false"></button>
    </header>
    <section class="modal-card-body">
      <settings></settings>
    </section>
  </div>
</div>
</div>
</template>

<script>
import Settings from '../Settings'
export default {
  components: {
    Settings
  },
  data () {
    return {
      showSettings: false
    }
  }
}
</script>


<style lang="scss" scoped>
.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
}
.settings-menu {
  position: relative;
  margin-left: auto;
}
</style>


