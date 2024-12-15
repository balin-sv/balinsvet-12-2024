<template>
  <div>
    <apexchart
      type="bar"
      :height="height"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Stat } from '@/types'

const props = defineProps<{
  stats: Stat[]
  height: number
}>()

const series = computed(() => [
  {
    data: props.stats.map((stat) => stat.base_stat),
  },
])

const chartOptions = computed(() => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A'],
  plotOptions: {
    bar: {
      columnWidth: '60%',
      distributed: true,
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      colors: ['#ffffff'],
    },
  },
  xaxis: {
    categories: props.stats.map((stat) => stat.stat.name),
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    labels: {
      colors: '#aaabad',
    },
  },
  tooltip: {
    enabled: false,
  },
}))
</script>
