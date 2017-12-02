<template>
<div>
  <section class="hero is-primary is-medium app-navbar">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <!-- <a class="navbar-item">
              <img src="https://bulma.io/images/bulma-type-white.png" alt="<logo>">
            </a> -->
            <span class="navbar-item is-size-7 has-text-white">
              gitmoji menu
            </span>
            <div class="navbar-item align-right">
            <!-- <a class="button is-small is-primary is-inverted is-outlined" @click="showSettings=true">
              <b-icon pack="fa" icon="gear"></b-icon>
              <span class="is-extral-small">Settings</span>
              </a> -->
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
      <button class="delete" aria-label="close" @click="showSettings = false"></button>
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
.align-right {
  position: relative;
  margin-left: auto;
}
.is-extral-small {
  font-size: 0.5rem;
}
</style>


