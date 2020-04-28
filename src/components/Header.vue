<template>
  <div class="header">
    <img
      class="logo"
      src="https://www.buffalo.edu/v-e541efb31faa2518c910054a542e8044/etc.clientlibs/wci/components/block/fatfooter/clientlibs/resources/ub-logo-two-line.png"
    >
    <h1 class="title">
      Health Quantifier
    </h1>
    <h3 class='subtitle'>
      Powered by the University at Buffalo
    </h3>
  </div>
</template>
<script>

</script>
<style lang="scss" scoped>
  .header {
    width: 100%;
    min-height: 300px;
    height: 40vh;
    background-image: url('https://i.imgur.com/k7LTXQ0.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
      width: 200px;
      position: absolute;
      left: 10%;
      top: 2em;
    }
    .title {
      color: #ffffff;
      font-size: 3.0em;
    }
    .subtitle {
      color: #dddddd;
      font-weight: normal;
    }
  }
</style>
