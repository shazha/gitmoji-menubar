<template>
  <div id="app">
    <app-header></app-header>
    <gitmoji-list-page class="app-main"></gitmoji-list-page>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '@/components/layout/Header'
  import GitmojiListPage from '@/components/GitmojiListPage'
  import AppFooter from '@/components/layout/Footer'

  export default {
    name: 'gitmoji-menubar',
    components: {
      AppHeader,
      GitmojiListPage,
      AppFooter
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  // Import Bulma's core
@import "~bulma/sass/utilities/_all";
$navbar-height: 2.5rem;
$navbar-item-img-max-height: 0.5rem;
$size-normal: $size-7;
$modal-z: 1025;
$modal-card-title-size: $size-7;
$modal-card-head-padding: 5px;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.app-main {
  padding-top: 2.5rem;
  transform: translate3d(0, 0, 0);
}
</style>
