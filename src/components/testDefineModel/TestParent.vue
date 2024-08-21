<template>
  <div>
    <p>count is: {{ count }}</p>
    <child
      :modelValue="count"
      @update:modelValue="updateCount"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "@/stores/counter";
import Child from "@/components/testDefineModel/TestChild.vue";
const counterStore = useCounterStore();

const count = computed(() => counterStore.getCount());
function updateCount(newValue: number) {
  counterStore.increment(newValue);
}
</script>
