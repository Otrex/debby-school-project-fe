<template>
  <button
    type="button"
    :class="['inline-flex items-center px-4 py-2 text-sm font-medium', btntype]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  v: {
    default: 'primary',
    type: String,
  },
});

const btntype = computed(() => {
  switch (props.v) {
    case 'primary':
      return 'text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2';
    case 'accent':
      return 'text-white border border-transparent rounded-md shadow-sm bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2';

    default:
      break;
  }
});
</script>
