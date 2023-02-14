<template>
  <div>
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Payment method
        </h3>
        <div class="mt-5">
          <div
            class="px-6 py-5 rounded-md bg-gray-50 sm:flex sm:items-start sm:justify-between"
          >
            <h4 class="sr-only">Visa</h4>
            <div class="sm:flex sm:items-start">
              <svg
                class="w-auto h-8 sm:h-6 sm:flex-shrink-0"
                viewBox="0 0 36 24"
                aria-hidden="true"
              >
                <rect width="36" height="24" fill="#224DBA" rx="4" />
                <path
                  fill="#fff"
                  d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                />
              </svg>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <div class="text-sm font-medium text-gray-900">
                  0x0E0C3a258630Ddc88349A5e12764b4B22186F238
                </div>
                <div class="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  <div>Ethereum Address</div>
                  <span class="hidden sm:mx-2 sm:inline" aria-hidden="true"
                    >&middot;</span
                  >
                  <div class="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div>
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-20 px-96">
      <p class="p-3 mb-5 text-red-500 bg-slate-200">
        You a requested to pay a sum of <b>20 ETH</b> to the address above
      </p>
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="payer" class="block text-sm font-medium text-gray-700"
            >Payer address</label
          >
          <div class="mt-1">
            <input
              id="payer"
              name="payer"
              type="payer"
              autocomplete="payer"
              required=""
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            for="transaction"
            class="block text-sm font-medium text-gray-700"
            >Transaction ID/ Hash</label
          >
          <div class="mt-1">
            <input
              id="transaction"
              name="transaction"
              type="transaction"
              autocomplete="current-transaction"
              required=""
              class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex min-h-[50px] items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Confirm Payment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'dashboard',
});
</script>
