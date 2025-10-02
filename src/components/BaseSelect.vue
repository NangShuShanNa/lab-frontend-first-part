<script setup lang="ts">
import type { Organizer } from '@/types'

// v-model binding
const modelValue = defineModel<number>()

// Props definition
interface BaseSelectProps {
  label: string
  options: Organizer[]
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: ''
})
</script>

<template>
  <div>
    <label v-if="label">
      {{ props.label }}
    </label>
    <select class="mb-6" v-bind="$attrs" v-model="modelValue">
      <option
        v-for="option in props.options"
        :key="option.id"
        :value="option.id"
        :selected="option.id === modelValue"
      >
        {{ option.organizationName }}
      </option>
    </select>
  </div>
</template>
