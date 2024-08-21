<template>
  <header></header>
  <main>
    <!-- <ContractList /> -->
    <parent />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import ContractList from "@/views/contract-list.vue";
import Parent from "@/components/testDefineModel/TestParent.vue";
</script>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  color: #000000;
}
</style>
