<template>
  <div id="app">
    <SearchList />
  </div>
</template>

<script setup lang="ts">
import SearchList from './components/SearchList.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}
</style>