<template>
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <div class="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Card -->
        <div
          v-for="card in cards"
          :key="card.name"
          class="overflow-hidden bg-white rounded-lg shadow"
        >
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <component
                  :is="card.icon"
                  class="w-6 h-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-1 w-0 ml-5">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    {{ card.name }}
                  </dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">
                      {{ card.amount }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="px-5 py-3 bg-gray-50">
            <div class="text-sm">
              <a
                :href="card.href"
                class="font-medium text-slate-700 hover:text-slate-900"
                >View all</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import {
  ScaleIcon,
} from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'dashboard',
});
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];
</script>
