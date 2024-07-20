<template>
  <header></header>
  <main>
    <ContractList />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import ContractList from "@/views/contract-list.vue";
</script>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  color: #000000;
}
</style>
