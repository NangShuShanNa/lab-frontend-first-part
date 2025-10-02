<script setup lang="ts">
const modelValue = defineModel<string>()

interface BaseInputProps {
  label: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  label: ''
})
</script>

<template>
  <div class="mb-6">
    <!-- ✅ show label if provided -->
    <label v-if="props.label" class="block mb-2 text-sm font-medium text-gray-700">
      {{ props.label }}
    </label>

    <!-- ✅ input bound to v-model -->
    <input
      class="w-full border rounded px-3 py-2"
      v-bind="$attrs"
      v-model="modelValue"
      :placeholder="props.label"
    />
  </div>
</template>
