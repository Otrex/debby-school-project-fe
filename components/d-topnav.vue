<template>
  <div
    class="flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none"
  >
    <button
      type="button"
      class="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 lg:hidden"
      @click="emit('toggleSidebar', true)"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3CenterLeftIcon class="w-6 h-6" aria-hidden="true" />
    </button>
    <!-- Search bar -->
    <div
      class="flex justify-between flex-1 px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8"
    >
      <div class="flex flex-1">
        <form class="flex w-full md:ml-0" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
              aria-hidden="true"
            >
              <MagnifyingGlassIcon class="w-5 h-5" aria-hidden="true" />
            </div>
            <input
              id="search-field"
              name="search-field"
              class="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search transactions"
              type="search"
            />
          </div>
        </form>
      </div>
      <div class="flex items-center ml-4 md:ml-6">
        <button
          type="button"
          class="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="w-6 h-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50"
            >
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span
                class="hidden ml-3 text-sm font-medium text-gray-700 lg:block"
                ><span class="sr-only">Open user menu for </span>Emilia
                Birch</span
              >
              <ChevronDownIcon
                class="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                aria-hidden="true"
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Your Profile</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Settings</a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  @click="logout"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  ]"
                  >Logout</a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid';

const router = useRouter();
const emit = defineEmits(['toggleSidebar']);
const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  },
});

function logout() {
  router.replace("/");
}
</script>
