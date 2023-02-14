<template>
  <div class="min-h-full">
    <d-sidenav :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="flex flex-col flex-1 lg:pl-64">
      <d-topnav :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 pb-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sidebarOpen = ref(false);

function toggleSidebar(key) {
  sidebarOpen.value = key;
}
</script>
