import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  function getCount() {
    return count.value;
  }

  function increment(newCount: number) {
    count.value = newCount;
  }

  return { count, getCount, increment };
}, {
  persist: true
})
