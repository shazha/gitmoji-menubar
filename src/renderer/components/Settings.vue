<template>
  <div>
    <launch-settings></launch-settings>
    <shortcut-settings></shortcut-settings>
  </div>
</template>

<script>
import LaunchSettings from './Settings/Launch'
import ShortcutSettings from './Settings/Shortcut'

export default {
  components: {
    LaunchSettings,
    ShortcutSettings
  }
}
</script>

