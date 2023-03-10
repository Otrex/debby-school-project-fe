<template>
  <div>
    <h2
      class="px-4 mx-auto mt-8 text-2xl font-medium leading-6 text-gray-900 max-w-7xl sm:px-6 lg:px-8"
    >
      History
    </h2>

    <!-- Activity list (smallest breakpoint only) -->
    <div class="shadow sm:hidden">
      <ul
        role="list"
        class="mt-2 overflow-hidden divide-y divide-gray-200 shadow sm:hidden"
      >
        <li v-for="transaction in transactions" :key="transaction.id">
          <a
            :href="transaction.href"
            class="block px-4 py-4 bg-white hover:bg-gray-50"
          >
            <span class="flex items-center space-x-4">
              <span class="flex flex-1 space-x-2 truncate">
                <BanknotesIcon
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <span class="flex flex-col text-sm text-gray-500 truncate">
                  <span class="truncate">{{ transaction.name }}</span>
                  <span
                    ><span class="font-medium text-gray-900">{{
                      transaction.amount
                    }}</span>
                    {{ transaction.currency }}</span
                  >
                  <time :datetime="transaction.datetime">{{
                    transaction.date
                  }}</time>
                </span>
              </span>
              <ChevronRightIcon
                class="flex-shrink-0 w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </a>
        </li>
      </ul>

      <nav
        class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200"
        aria-label="Pagination"
      >
        <div class="flex justify-between flex-1">
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
            >Previous</a
          >
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500"
            >Next</a
          >
        </div>
      </nav>
    </div>

    <!-- Activity table (small breakpoint and up) -->
    <div class="hidden sm:block">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex flex-col mt-2">
          <div
            class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-left text-gray-900 bg-gray-50"
                    scope="col"
                  >
                    Transaction
                  </th>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-right text-gray-900 bg-gray-50"
                    scope="col"
                  >
                    Amount
                  </th>
                  <th
                    class="hidden px-6 py-3 text-sm font-semibold text-left text-gray-900 bg-gray-50 md:block"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-right text-gray-900 bg-gray-50"
                    scope="col"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="transaction in transactions"
                  :key="transaction.id"
                  class="bg-white"
                >
                  <td
                    class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                  >
                    <div class="flex">
                      <a
                        :href="transaction.href"
                        class="inline-flex space-x-2 text-sm truncate group"
                      >
                        <BanknotesIcon
                          class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <p
                          class="text-gray-500 truncate group-hover:text-gray-900"
                        >
                          {{ transaction.name }}
                        </p>
                      </a>
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    <span class="font-medium text-gray-900">{{
                      transaction.amount
                    }}</span>
                    {{ transaction.currency }}
                  </td>
                  <td
                    class="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                  >
                    <span
                      :class="[
                        statusStyles[transaction.status],
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                      ]"
                      >{{ transaction.status }}</span
                    >
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    <time :datetime="transaction.datetime">{{
                      transaction.date
                    }}</time>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Pagination -->
            <nav
              class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div class="hidden sm:block">
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">1</span>
                  to
                  <span class="font-medium">10</span>
                  of
                  <span class="font-medium">20</span>
                  results
                </p>
              </div>
              <div class="flex justify-between flex-1 sm:justify-end">
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >Previous</a
                >
                <a
                  href="#"
                  class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >Next</a
                >
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { statusStyles } from '../../utils';
import { BanknotesIcon } from '@heroicons/vue/20/solid';

definePageMeta({
  layout: 'dashboard',
});

const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11',
  },
  // More transactions...
];
</script>
