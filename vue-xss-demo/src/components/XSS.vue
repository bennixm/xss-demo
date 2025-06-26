<template>
  <div class="xss-app">
    <h1>{{ msg }}</h1>

    <input v-model="userInput" placeholder="Enter a comment" />
    <div class="btns">
      <button @click="sendSecure">Send Secure</button>
      <button @click="sendInsecure">Send Insecure</button>
    </div>

    <h2>🔴 Unsafe Rendering (v-html)</h2>
    <div class="box" v-html="userInput"></div>

    <h2>🟢 Safe Rendering (Sanitized)</h2>
    <div class="box" v-html="sanitizedInput"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import DOMPurify from 'dompurify'

const userInput = ref('')
const sanitizedInput = computed(() => DOMPurify.sanitize(userInput.value))

const sendSecure = async () => {
  await axios.post('http://localhost:3000/comment', { content: userInput.value }, { withCredentials: true })
  alert('✅ Secure comment submitted. Check cookies (HttpOnly).')
}

const sendInsecure = async () => {
  await axios.post('http://localhost:3000/insecure-comment', { content: userInput.value }, { withCredentials: true })
  alert('⚠️ Insecure comment submitted. Cookie is accessible in JavaScript!')
}

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.app {
  max-width: 600px;
  margin: auto;
  font-family: Arial;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
}

.box {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  background: #f4f4f4;
}
</style>
