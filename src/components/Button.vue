<template>
  <button class="btn">
    {{ title }}
  </button>
</template>
<script>
  export default {
    name: 'GrowthAppButton',
    props: ['title'],
  };
</script>
<style lang="scss" scoped>
  .btn {
    width: 100%;
    border-radius: 8px;
    font-size: 1em;
    padding: 0.5em;
    text-align: center;
    background-color: #DA3C27;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
</style>
