<script setup>
import { ref, onMounted } from "vue";
import startScreen from "./components/startScreen.vue";
import loginPop from "./components/loginOptions.vue";
import { createScene, getScenes, updateScene, deleteScene } from "./firebase/services/scenesService.js";
import { createClass, getClasses, updateClass, deleteClass } from "./firebase/services/classService.js";
import classList from "./components/classList.vue";

const scenes = ref([]);
const screen = ref("start");
const classes = ref([]);
let newScene;
const activeUser = ref(null);

function openLogin() {
    screen.value = "login";
}

function handleLogin(data) {
    activeUser.value = data;
    console.log("Login frontend:", data);
    // alert("Login enviado!\n(Aqui você conectaria ao backend)");
}

onMounted(async () => {
    scenes.value = await getScenes();
    classes.value = await getClasses();
    console.log("Classes loaded:", classes.value);
    newScene = scenes.value[0].history1;
});
</script>

<template>
    <div class="app bg-fabula">
        <startScreen v-if="screen == 'start' && !activeUser" @start="openLogin" />
        <loginPop v-if="screen == 'login' && !activeUser" @close="screen = 'start'" @login="handleLogin" />
        <classList v-if="activeUser" />
    </div>
</template>

<style scoped>
:host {
    display: block;
    height: 100vh;
}
</style>
