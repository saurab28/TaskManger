<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter()

const loginVerification = (event) => {
  event.preventDefault();
  if (username.value === 'Admin' && password.value === 'password') {
    error.value = "";
    console.log("Login successful");
    router.push('/dashboard');
  }
  else {
    error.value = "Invalid Credentials";
  }
}
</script>

<template>
  <div class="flex flex-column justify-center items-center bg-gray-700 h-screen">
    <form
      class="bg-white w-[40%] h-[30%] rounded flex flex-col p-5 justify-center text-black "
      @submit="loginVerification"
    >
      <h1 class="text-2xl mb-4">Login</h1>
      <input
        v-model="username"
        placeholder="Username"
        class="border-black border-2 rounded-sm p-1 my-2 text-lg"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="border-black border-2 rounded-sm p-1 my-2 text-lg"
      />
      <button class="bg-gray-700 text-white p-2 rounded size-min px-6 mt-3">Login</button>
      <p v-if="error" class="text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped></style>
