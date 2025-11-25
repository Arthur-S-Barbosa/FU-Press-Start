<script setup>
import { ref, onMounted } from "vue";
import startScreen from "./components/startScreen.vue";
import loginPop from "./components/loginOptions.vue";
import { getScenes } from "./firebase/services/scenesService.js";
import { getClasses, createClass } from "./firebase/services/classService.js";
import { createUser, getUsers, loginUser } from "./firebase/services/userService.js";
import { getCharacters } from "./firebase/services/characterService.js";
import classList from "./components/classList.vue";

const scenes = ref([]);
const screen = ref("start");
const classes = ref([]);
const users = ref([]);
const characters = ref([]);
let newScene;
const activeUser = ref(null);

function openLogin() {
    screen.value = "login";
}

function handleAccess(data) {
}

async function handleUserLogin(data) {
    try {
        const user = await loginUser(data.email, data.password);
        activeUser.value = user;
    } catch (err) {
        alert("Email ou senha inválidos");
    }
}

async function handleUserRegister(data) {
    try {
        await createUser(data.email, data.password, {
            name: data.username,
        });
        activeUser.value = user;
    } catch (err) {
    }
}

async function handleCreateClass(data) {
    await createClass(data.name, activeUser.value.uid, data.password);
}

onMounted(async () => {
    scenes.value = await getScenes();
    classes.value = await getClasses();
    users.value = await getUsers();
    characters.value = await getCharacters();
    newScene = scenes.value[0].history1;
});
</script>

<template>
    <div class="app bg-fabula">
        <startScreen v-if="screen == 'start' && !activeUser" @start="openLogin" />
        <loginPop v-if="screen == 'login' && !activeUser" @close="screen = 'start'" @login="handleUserLogin"
            @register="handleUserRegister" />
        <classList v-if="activeUser" @create="handleCreateClass" @access="handleAccess" />

    </div>
</template>

<style scoped>
:host {
    display: block;
    height: 100vh;
}
</style>
