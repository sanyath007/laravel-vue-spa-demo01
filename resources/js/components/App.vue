<template>
  <div id="main">
    <Header />

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header';

export default {
  name: 'app',
  components: {
    Header,
  },
  mounted() {
    console.log('Component mounted.')
  }
}
</script>
