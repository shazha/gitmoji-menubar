<template>
  <footer class="footer">
    <div class="container is-fluid">
      <div class="content has-text-centered is-size-7">
        <p><b-icon pack="fa" icon="code" size="is-small"></b-icon> with <b-icon pack="fa" icon="heart" class="heart" size="is-small"></b-icon> by <a href="#" @click="open('https://github.com/shazha/gitmoji-menubar')">shazha</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>


<style lang="scss" scoped>
.footer {
  padding: 1.0rem 0.5rem 0.2rem;
  .content p {
    margin-bottom: 0.5rem;
  }
  .social a {
    border-bottom: none !important;
  }
  .heart {
    color: red;
  }
}
</style>

