<template>
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
</template>
<script>
  import Content from './components/Content.vue';
  import Footer from './components/Footer.vue';
  import Header from './components/Header.vue';

  export default {
    name: 'GrowthAppMainComponent',
    components: {
      Content,
      Footer,
      Header,
    },
    data() {
      return {
        test: 'Hello, World!!!'
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import "./assets/main.css";
</style>
