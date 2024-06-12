import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// pinia方式
export const useCounterStore = defineStore('counter', {

  state: () => ({
    count: 0,
    theme: 'light'
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    subtract() {
      this.count--
    }
  }
})

// composition方式
export const useCounterStore_1 = defineStore('counter', () => {
  const count = ref(1)
  const theme = ref('light')
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }
  function subtract() {
    count.value--
  }
  return { count, doubleCount, theme, increment, subtract }
})
