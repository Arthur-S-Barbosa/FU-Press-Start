<script setup>
import { ref } from "vue";
import startScreen from "./components/startScreen.vue";
import loginPop from "./components/loginPop.vue";

const screen = ref<"start" | "login">("start");

function openLogin() {
    screen.value = "login";
}

function handleLogin(data) {
    console.log("🔐 Login frontend:", data);
    alert("Login enviado!\n(Aqui você conectaria ao backend)");
}
// import { ref, onMounted } from 'vue'
// const text = "Aperte Start";
// const test = ref("");
// const click = ref(0);

// const time = ref(true);

// onMounted(() => {
//     let i = 0;
//     const interval = setInterval(() => {
//         test.value += text.charAt(i);
//         i++;
//         if (i >= text.length) {
//             clearInterval(interval);
//             time.value = false;
//         }
//     }, 200);
//     window.addEventListener('mousemove', (e) => {
//         x.value = e.clientX
//         y.value = e.clientY
//     });
// });

// function clicou() {
//     click.value++;
// }
</script>

<template>
    <div class="app bg-fabula">
        <startScreen v-if="screen === 'start'" @start="openLogin" />

        <loginPop v-if="screen === 'login'" @close="screen = 'start'" @login="handleLogin" />
    </div>
    <!-- <div class="primary" @click="clicou">
        <h1 class="blur">{{ test }}</h1>
        <h1>{{ test }}</h1>
        <h1 v-if="time" class="line">_</h1>
    </div>
    <p>{{ click }}</p> -->
</template>

<style scoped>
/* ocupa a tela inteira */
:host {
    display: block;
    height: 100vh;
}
</style>
