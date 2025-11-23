<script setup>
import { ref, onMounted } from "vue";
import startScreen from "./components/startScreen.vue";
import loginPop from "./components/loginOptions.vue";

const screen = ref("start");

function openLogin() {
    screen.value = "login";
}

function handleLogin(data) {
    console.log("Login frontend:", data);
    alert("Login enviado!\n(Aqui você conectaria ao backend)");
}

onMounted(() => {
});
</script>

<template>
    <div class="app bg-fabula">
        <startScreen v-if="screen == 'start'" @start="openLogin" />
        <loginPop v-if="screen == 'login'" @close="screen = 'start'" @login="handleLogin" />
    </div>
</template>

<style scoped>
:host {
    display: block;
    height: 100vh;
}
</style>
