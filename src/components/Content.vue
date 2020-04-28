<template>
  <div class="content">
    <h1 class="title">{{ title }}</h1>
    <h4 class="subtitle">{{ subtitle }}</h4>
    <Calculator class="calculator" />
  </div>
</template>
<script>
  import Calculator from './Calculator.vue';
  export default {
    components: {
      Calculator,
    },
    data() {
      return {
        title: "Get Started",
        subtitle: "Quantifying your health is simple and fun!"
      };
    }
  };
</script>
<style lang="scss" scoped>
  .content {
    padding: 20px;
    width: 40%;
    @media only screen and (max-width: 768px) {
      width: 80%;
    }
    margin: auto;
    margin-top: -2em;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #dddddd;
    text-align: center;
    .title {
      color: #012F55;
    }
    .subtitle {
      color: #999999;
      font-style: italic;
    }
    .calculator {
      margin-top: 1em;
    }
  }
</style>
