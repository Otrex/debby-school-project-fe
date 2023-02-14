<template>
  <div>
    <main>
      <section class="relative w-full h-full min-h-screen py-40">
        <div
          class="absolute top-0 w-full h-full bg-no-repeat bg-slate-800 bg-full"
          :style="`background-image: url('${authBg}');`"
        ></div>
        <div class="container h-full px-4 mx-auto">
          <div class="flex items-center content-center justify-center h-full">
            <div class="w-full px-4 lg:w-4/12">
              <div
                class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-slate-200"
              >
                <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <div
                    class="pt-5 mb-3 font-bold text-center text-blueGray-400"
                  >
                    <h2 class="pt-6 text-2xl font-bold text-blueGray-500">
                      Sign - In
                    </h2>
                  </div>
                  <form>
                    <div class="relative w-full mb-3">
                      <label
                        class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        v-model="form.email"
                        class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Email"
                      />
                    </div>

                    <div class="relative w-full mb-3">
                      <label
                        class="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        class="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Password"
                        v-model="form.password"
                      />
                    </div>
                    <div>
                      <label class="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          class="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-slate-700"
                        />
                        <span class="ml-2 text-sm font-semibold text-slate-600">
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div class="mt-6 text-center">
                      <button
                        class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-800 active:bg-slate-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        @click="login"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="relative flex flex-wrap mt-6 text-white">
                <div class="w-1/2">
                  <a href="javascript:void(0)" class="text-blueGray-200">
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div class="w-1/2 text-right">
                  <a href="mailto:obisiket@gmail.com" class="text-blueGray-200">
                    <small>Contact Support</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import api from '~~/api';
import authBg from '../assets/img/auth-bg.png';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

async function login() {
  try {
    const res = await api.login({
      email: form.email,
      password: form.password,
    });

    console.log(res);
  } catch (error) {}

  router.push('/dashboard');
}
</script>
