<template>
  <div>
    <p>Child</p>
    <button @click="addCount">Add 1</button>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
const countValue = defineModel<number>();

function addCount() {
  countValue.value!++;
}
</script>
