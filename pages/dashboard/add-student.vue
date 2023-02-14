<template>
  <div class="pt-10 px-96">
    <h1 class="mb-5 text-2xl font-medium">Enter Students Data</h1>
    <form
      action="#"
      method="POST"
      class="grid grid-cols-1 mt-9 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      <div>
        <label for="first-name" class="block text-sm font-medium text-gray-700"
          >First name</label
        >
        <div class="mt-1">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:border-grape-500 focus:ring-grape-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label for="last-name" class="block text-sm font-medium text-gray-700"
          >Last name</label
        >
        <div class="mt-1">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autocomplete="family-name"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:border-grape-500 focus:ring-grape-500 sm:text-sm"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label for="matno" class="block text-sm font-medium text-gray-700"
          >MatNo</label
        >
        <div class="mt-1">
          <input
            id="matno"
            name="matno"
            type="matno"
            autocomplete="matno"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:border-grape-500 focus:ring-grape-500 sm:text-sm"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <label for="company" class="block text-sm font-medium text-gray-700"
          >Student Password</label
        >
        <div class="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            autocomplete="organization"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:border-grape-500 focus:ring-grape-500 sm:text-sm"
          />
        </div>
      </div>
      <div class="sm:col-span-2">
        <div class="flex justify-between">
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >Phone</label
          >
          <span id="phone-description" class="text-sm text-gray-500"
            >Optional</span
          >
        </div>
        <div class="mt-1">
          <input
            type="text"
            name="phone"
            id="phone"
            autocomplete="tel"
            aria-describedby="phone-description"
            class="block w-full border-gray-300 rounded-md shadow-sm focus:border-grape-500 focus:ring-grape-500 sm:text-sm"
          />
        </div>
      </div>

      <div class="text-right sm:col-span-2">
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-grape-600 hover:bg-grape-700 focus:outline-none focus:ring-2 focus:ring-grape-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'dashboard',
});
</script>
