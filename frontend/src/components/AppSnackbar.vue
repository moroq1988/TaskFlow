<script setup lang="ts">
interface Props {
  modelValue: boolean;
  text: string;
  color?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<template>
  <v-snackbar
    :model-value="modelValue"
    :color="color"
    @update:model-value="emit('update:modelValue', $event)"
  >
    {{ text }}
    <template #actions>
      <v-btn icon variant="text" @click="emit('update:modelValue', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
