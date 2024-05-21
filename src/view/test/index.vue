<script setup>
import { ElButton } from 'element-plus'
import {storeToRefs } from 'pinia'
import { useCounterStore } from '../../stores/counter'


const counter = useCounterStore()
const {count,doubleCount} = storeToRefs(counter)
const { increment, subtract } = counter

</script>

<template>
  <h1>{{count}}</h1>
  <h1>{{doubleCount}}</h1>
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary" @click="increment">Primary</el-button>
    <el-button type="success" @click="subtract">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>



<style scoped>

</style>
