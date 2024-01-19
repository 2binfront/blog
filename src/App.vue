<template>
  <div class="container">
    <router-view :key="$route.fullPath" class="view-content"></router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
  .vsc-initialized {
    margin: 0;
  }

  body {
    background-color: #f9f9f9;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .container {
    width: 100vw;
    height: 100vh;
  }

  img {
    vertical-align: bottom;
  }
</style>
